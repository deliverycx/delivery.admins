import { Get, Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { DownloadImage } from "src/application/lib/download";
import { GeoCoder } from "src/application/lib/geocoder";
import { CategoryClass } from "src/database/mongodbModel/delivery/category.model";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import { ProductClass } from "src/database/mongodbModel/delivery/product.model";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";
import { Types, Document } from "mongoose";
import { ORG_STATUS, DELIVERY_METODS, PAYMENT_METODS } from "src/application/constants/const.orgstatus";
import * as fs from "fs"
import { join } from 'path';
import { writeFile, readFile } from 'fs/promises';

@Injectable()
export class IikoOrganizationServises {
	private geoCoder
	private downloader

	constructor(
		private readonly iikoAxios: IIkoAxios,
		@InjectModel(OrganizationClass) private readonly organizationModel: ReturnModelType<typeof OrganizationClass>,
		@InjectModel(CityClass) private readonly cityModel: ReturnModelType<typeof CityClass>,
		@InjectModel(CategoryClass) private readonly categoryModel: ReturnModelType<typeof CategoryClass>,
		@InjectModel(ProductClass) private readonly productModel: ReturnModelType<typeof ProductClass>,
		@InjectModel(OrganizationStatusClass) private readonly orgstatusModel: ReturnModelType<typeof OrganizationStatusClass>
	) {
		this.geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);
		this.downloader = new DownloadImage();
	}


	async iikkoOrgs() {
		const iikkoOrgs = await this.iikoAxios.getOrganizationList()
		const orgListBase = await this.organizationModel.find()
		const orgListId = orgListBase.map((value: any) => value.id)

		return iikkoOrgs.map((org: any) => {
			return {
				id: org.id,
				name: org.name,
				new: orgListId.includes(org.id)
			}
		})


	}

	async ikkoOrgInfo(organization: string) {
		const termital = await this.iikoAxios.termiralGroops(organization)
		if (termital) {
			return {
				idtermital: termital.id,
				organizationid: termital.organizationId,
				adress: termital.name
			}
		}
		return null
	}


	async iikkoHooks(organization: string, localhoste: string) {
		await this.iikoAxios.updateIIkkoWebHooks(organization, localhoste)
	}


	async poolingOrg(organization: string) {
		const organizationinfo = await this.iikoAxios.getOrganization(organization)
		const termital = await this.ikkoOrgInfo(organization)
		if (termital) {
			const cityRes = termital.adress

			const matchesAddress = cityRes.match(
				/(?<city>.*?),\s?(?<street>.*)/i
			);
			if (matchesAddress) {
				const { city, street } = matchesAddress.groups;
				const { position } = await this.geoCoder.resolve(
					cityRes
				);


				const findcity = await this.cityModel.findOne({ name: city })

				const cityId = findcity ? findcity._id : new Types.ObjectId();



				const objectIdPoint = await this.organizationModel.findOneAndUpdate(
					{ id: termital.organizationid },
					{
						$setOnInsert: {
							
							isHidden: true,
							
							address: {
								street,
								longitude: position[0],
								latitude: position[1]
							},
							workTime: ['10:00-22:00'],
							phone: "",
							nomenuweb:false
						},
						$set:{
							id: termital.organizationid,
							city: cityId,
							cityid: organizationinfo.defaultDeliveryCityId,
							terminal: termital.idtermital,
						}

					},
					{ upsert: true, new: true }
				);


				await this.orgstatusModel.findOneAndUpdate(
					{ organization: termital.organizationid },
					{
						$setOnInsert: {
							organizationStatus: ORG_STATUS.NOWORK,
							deliveryMetod: [DELIVERY_METODS.COURIER, DELIVERY_METODS.PICKUP],
							paymentMetod: [PAYMENT_METODS.CASH]
						}
					},
					{ upsert: true, new: true })


				await this.cityModel.updateOne(
					{ name: city },
					{
						$setOnInsert: {
							_id: cityId,
							name: city,

						},
						$addToSet: {
							organizations: objectIdPoint
						}
					},
					{ upsert: true }
				);


				const cityiikko = await this.iikoAxios.getStreetCity(organization, organizationinfo.defaultDeliveryCityId)
				const cityFiles = JSON.stringify(cityiikko)

				const folderStreet = fs.existsSync(join(process.cwd() + `/public/static/street/`))
				if (!folderStreet) {
					fs.mkdir(join(process.cwd() + `/public/static/street/`), async err => {
						if (err) throw err; // не удалось создать папку
						console.log('Папка успешно создана');
						await writeFile(join(process.cwd() + `/public/static/street/${termital.organizationid}.json`), cityFiles)
					});
				} else {
					await writeFile(join(process.cwd() + `/public/static/street/${termital.organizationid}.json`), cityFiles)
				}




			}
		}
		await this.iikkoHooks(organization,"https://хинкалыч.рф/api/webhook/webhooks")
	}


	async poolingMenu(oraganization: string) {
		const nomenclature = await this.iikoAxios.getNomenclature(oraganization)

		const nomenclatureFiles = JSON.stringify(nomenclature)

		const folderStreet = fs.existsSync(join(process.cwd() + `/public/static/menu/`))
		if (!folderStreet) {
			fs.mkdir(join(process.cwd() + `/public/static/menu/`), async err => {
				if (err) throw err; // не удалось создать папку
				console.log('Папка успешно создана');
				await writeFile(join(process.cwd() + `/public/static/menu/${oraganization}.json`), nomenclatureFiles)
			});
		} else {
			await writeFile(join(process.cwd() + `/public/static/menu/${oraganization}.json`), nomenclatureFiles)
		}

		return {
			revision: nomenclature.revision,
			oraganization
		}

	}

	async poolingMenuWeb() {
		const orgresult = await this.organizationModel.find(
			{
				//nomenuweb:false || undefined || null,
				delivMetod:null
			}
		)

		
		//const orgresult: [] = await this.iikoAxios.getOrganizationList()
		const orglist = orgresult 
		.filter((val:any) =>{
			return !val.nomenuweb && val
		})
		.map((value: any) => {
			return value.id
			
		})
		//console.log(orglist);

		const nomenclature = await this.iikoAxios.getMenuWeb(orglist)
		const menu: [] = nomenclature.pureExternalMenuItemCategories

		orglist.map(async (oraganization: string) => {


			if (menu.length !== 0) {
				const nomen = menu.reduce((acc: any, cate: any) => {
					cate.items.forEach((item: any) => {
						
						
						const itemOrg = item.itemSizes[0].prices

						
						if(item.name == 'Хачапури по-аджарски чкмерули'){
							console.log(item.name,itemOrg);
						}
						itemOrg.forEach((orgs: { organizations: string[], price: number | null }) => {
							//
							const resultFind = orgs.organizations.includes(oraganization)
							///console.log(resultFind);

							if (resultFind && orgs.price) {
								//console.log(oraganization,item.name);

								acc.groups.push({
									name: cate.name,
									id: cate.id,
									imageLinks:[cate.buttonImageUrl]
								})
								
								acc.products.push({
									name: item.name,
									description: item.description,
									id: item.iikoItemId,
									code: item.itemSizes[0].sku,
									parentGroup: cate.id,
									imageLinks: [item.itemSizes[0].buttonImageUrl],
									measureUnit: item.measureUnit,
									sizePrices:[
										{
											price:{
												currentPrice:orgs.price
											}
										}
									],
									tags: item.labelNames,
									weight:item.itemSizes[0].portionWeightGrams
								})
								
							}
						})

						
					})
					return acc
				}, {
					groups: [],
					products: []
				})

				const table = {};
				nomen.groups = nomen.groups.filter(({ name }) => (!table[name] && (table[name] = 1)));

				//console.log(nomen);
				const nomenclatureFiles = JSON.stringify(nomen)

				const folderStreet = fs.existsSync(join(process.cwd() + `/public/static/menu/`))
				if (!folderStreet) {
					fs.mkdir(join(process.cwd() + `/public/static/menu/`), async err => {
						if (err) throw err; // не удалось создать папку
						console.log('Папка успешно создана');
						await writeFile(join(process.cwd() + `/public/static/menu/${oraganization}.json`), nomenclatureFiles)
					});
				} else {
					await writeFile(join(process.cwd() + `/public/static/menu/${oraganization}.json`), nomenclatureFiles)
				}

			}

		})
		console.log("finish");
	}

	async getFileMenu(oraganization: string) {
		const file = JSON.parse(fs.readFileSync(join(process.cwd() + `/public/static/menu/${oraganization}.json`), 'utf8'));
		return file

	}

	async getFileStreet(oraganization: string) {
		const file = JSON.parse(fs.readFileSync(join(process.cwd() + `/public/static/street/${oraganization}.json`), 'utf8'));
		return file

	}

}