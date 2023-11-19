import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { SocialModel } from "src/database/mongodbModel/admin/social.model";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { organizationEntities } from "../entities/organization.entities";
import { ORG_STATUS, DELIVERY_METODS, PAYMENT_METODS } from "src/application/constants/const.orgstatus";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(OrganizationClass) private readonly organizationModel: ReturnModelType<typeof OrganizationClass>,
    @InjectModel(CityClass) private readonly cityModel: ReturnModelType<typeof CityClass>,
		@InjectModel(SocialModel) private readonly socialModel: ReturnModelType<typeof SocialModel>,
		@InjectModel(OrganizationStatusClass) private readonly statusModel: ReturnModelType<typeof OrganizationStatusClass>
  ) { }

  async getAllOrganization() {
    const result = await this.cityModel
            .find({})
            .populate("organizations")
            .lean();

        return result
  }

	async findCity(id:string){
		return await this.cityModel.findById(id).lean()
	}

  async swtchDelivMetod(orgid:string,metod:string) {
    const result = await this.organizationModel.findOneAndUpdate(
      {
        id: orgid
      },
      {
        $set: {
          delivMetod: metod
        }
      },
      { new: true }
    )
    return organizationEntities.delivMetod(result.id,result.delivMetod)
  }
	async getBuOrganization(idorg:string){
		const result = await this.organizationModel
            .findOne({id:idorg})
						.populate('filters')
            .lean();

			console.log(result);
      return result
	}

  async hiddenOranizationMetod(orgid: string, metod: boolean) {
    const result = await this.organizationModel.findOneAndUpdate(
      {
        id: orgid
      },
      {
        $set: {
          isHidden: metod
        }
      },
      { new: true }
    )


    return organizationEntities.hiddenMetod(result.id,result.isHidden)
  }

	async checkOranizationMetod(orgid: string) {
    const result = await this.organizationModel.findOne(
      {
        id: orgid
      }
    )
		const city = await  this.cityModel.find({
			organizations:{
				$all:[result._id]
			}
		})
		console.log('город',city);

		if(JSON.stringify(result.city)  !== JSON.stringify(city[0]._id)){
			await this.organizationModel.findOneAndUpdate(
				{
					id: orgid
				},
				{
					$set: {
						city: city[0]._id
					}
				},
				{ new: true }
			)

		}

    return city
  }


	async hiddenCityMetod(orgid: string, metod: boolean) {
		console.log(orgid,metod);
    const result = await this.cityModel.findOneAndUpdate(
      {
        _id: orgid
      },
      {
        $set: {
          isHidden: metod
        }
      },
      { new: true }
    )
		console.log('res',result);

    return organizationEntities.hiddenMetod(result._id,result.isHidden)
  }
	async OpenOrgMetod(orgid: string, metod: boolean) {
		console.log(orgid,metod);
    const result = await this.cityModel.findOneAndUpdate(
      {
        _id: orgid
      },
      {
        $set: {
          isHidden: metod
        }
      },
      { new: true }
    )
		console.log('res',result);

    return organizationEntities.hiddenMetod(result._id,result.isHidden)
  }


	async socialMetod(idorganization:string,social:[]){
		const result = await this.socialModel.findOneAndUpdate(
      {
        idorganization: idorganization
      },
      {
        $set: {
          social: social
        }
      },
      { new: true }
    )
		if(!result){
			await this.socialModel.create({
				idorganization,
				social
			})
		}

	}

	async socialLikeMethod(idorganization:string,like: any){
		const result = await this.socialModel.findOneAndUpdate(
			{
				idorganization: idorganization
			},
			{
				$set: {
					like: like
				}
			},
			{ new: true }
		)

		if(!result){
			await this.socialModel.create({
				idorganization,
				like
			})
		}
	}

	async socialMetodBu(idorganization:string){

		const result = await this.socialModel.findOne(
      {
        idorganization: idorganization
      }
    )
		return result

	}

	async reservetableMetod(idorganization:string,metod:boolean){

		const result = await this.organizationModel.findOneAndUpdate(
      {
        id: idorganization
      },
      {
        $set: {
          reservetable: metod
        }
      },
      { new: true }
    )
		console.log('заказ стоилка',result);

		return result
	}

	async OrganizationTimeMetod(idorganization:string,time:string[]){
		const result = await this.organizationModel.findOneAndUpdate(
      {
        id: idorganization
      },
      {
        $set: {
          workTime: time
        }
      },
      { new: true }
    )
		console.log('время точки',result);
		return result
	}

	async settingOrgMetod(idorganization:string,setting){
		console.log(setting);
		const result = await this.organizationModel.findOneAndUpdate(
      {
        id: idorganization
      },
      {
        $set: {
          phone: setting.phone,
					address:{
						street:setting.adress,
						longitude:setting.longitude,
						latitude:setting.latitude
					}

        }
      },
      { new: true }
    )
		return result
	}

	async addCityMetod(city:any){
		console.log(city);
		const result = await this.cityModel.create(city)

		return result
	}

	async addOrganizationMetod(org:any){
		console.log(org);
		const neworg = await this.organizationModel.create(org)
		const result = await this.cityModel.findOneAndUpdate(
			{
				_id:org.city
			},
			{
				$push:{
					organizations:neworg._id
				}
			}
		)
		const status = await this.statusModel.findOneAndUpdate(
			{organization:String(org.id)},
			{
				$setOnInsert:{
					organizationStatus:ORG_STATUS.NOWORK,
					deliveryMetod:[DELIVERY_METODS.COURIER,DELIVERY_METODS.PICKUP],
					paymentMetod:[PAYMENT_METODS.CASH,PAYMENT_METODS.BYCARD]
				}
			},
			{ upsert: true, new: true })
		console.log('ress',status);

		return result
	}

	async DeliteOrgMetod(id:any){
		const result = await this.organizationModel.deleteOne({id:id})

		return result
	}

	async RedirectOrgMetod(idorganization,url:any){
		const result = await this.organizationModel.findOneAndUpdate(
			{
        id: idorganization
      },
			{
				redirect:url
			}
		)

		return result
	}
	async RedirectONOrgMetod(idorganization:string,metod:boolean){
		const result = await this.organizationModel.findOneAndUpdate(
			{
        id: idorganization
      },
			{
				redirectON:metod
			}
		)

		return result
	}
	async AddGalleryOrgMetod(idorganization,images:[]){
		const result = await this.organizationModel.findOneAndUpdate(
			{
        id: idorganization
      },
			{
				gallery:images
			}
		)

		return result
	}
	async filtersMetod(idorganization,filterlist:string){

		const result = await this.organizationModel.findOneAndUpdate(
			{
        id: idorganization
      },
			{
				$set:{
					filters:filterlist
				}
			},
			{ upsert: true, new: true }
		)

		return result
	}

}