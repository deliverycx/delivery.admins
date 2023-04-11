import { Injectable } from "@nestjs/common";
import axios from "axios";
import { DownloadImage } from "src/application/lib/download";
import { GeoCoder } from "src/application/lib/geocoder";
import { Types, Document } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { ReturnModelType } from "@typegoose/typegoose";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { CategoryClass } from "src/database/mongodbModel/delivery/category.model";
import { ProductClass } from "src/database/mongodbModel/delivery/product.model";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";
import { DELIVERY_METODS, ORG_STATUS, PAYMENT_METODS } from "src/application/constants/const.orgstatus";


const header = (token:string) =>{
	return {
		headers: { Authorization: `Bearer ${token}` }
	}
}

@Injectable()
export class IikoRequesterServises {
  public token: string;
  private cities: Record<string, Array<any>>;
  private geoCoder
  private downloader
  
  constructor(
    @InjectModel(OrganizationClass) private readonly organizationModel: ReturnModelType<typeof OrganizationClass>,
    @InjectModel(CityClass) private readonly cityModel: ReturnModelType<typeof CityClass>,
    @InjectModel(CategoryClass) private readonly categoryModel: ReturnModelType<typeof CategoryClass>,
    @InjectModel(ProductClass) private readonly productModel: ReturnModelType<typeof ProductClass>,
		@InjectModel(OrganizationStatusClass) private readonly orgstatusModel: ReturnModelType<typeof OrganizationStatusClass>
  ) {
    this.geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);
    this.downloader = new DownloadImage();
  }

  async getToken() {
    
    const { data } = await axios.post(
        'https://api-ru.iiko.services/api/1/access_token',
				{
					apiLogin: "539ecfae"
				}
    );
				
    this.token = data.token
  }
  async getAddresses() {
    const token = this.token;

    const { data } = await axios.get(
      'https://api-ru.iiko.services/api/1/organizations',
			{
				headers: { Authorization: `Bearer ${token}` }
			}
    );
		
		
    this.cities = {};
    for (let i = 0; i < data.organizations.length; i++) {
      const organizations = data.organizations[i];
			

      const {data:resorg} = await axios.post(
        'https://api-ru.iiko.services/api/1/organizations',
				{
					organizationIds: [
						organizations.id
					],
					returnAdditionalInfo: true,
					includeDisabled: true
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
    	);
			const organization = resorg.organizations[0]

			

			const {data:rescity} = await axios.post(
        'https://api-ru.iiko.services/api/1/cities',
				{
					organizationIds: [
						organizations.id
					]
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
    	);


			const {data:terminal} = await axios.post(
        'https://api-ru.iiko.services/api/1/terminal_groups',
				{
					organizationIds: [
						organizations.id
					],
					includeDisabled: true
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
    	);

			const cityRes = terminal.terminalGroups[0].items[0].name



			

      const matchesAddress = cityRes.match(
        /(?<city>.*?),\s?(?<street>.*)/i
      );

			
				
			
      if (matchesAddress) {
        const { city, street } = matchesAddress.groups;
        
				/**/
        const { position } = await this.geoCoder.resolve(
          cityRes
        );
				
				
				//const position = [ organization.longitude,organization.latitude ]	

        const organizationInArray = {
          street,
          guid: organization.id,
          longitude: position[0],
          latitude: position[1],
          workTime: ['10:00-22:00'],
          phone: organization.phone,
					
        };

				
        if (city.trim() in this.cities) {
					
          this.cities[city.trim()].push(organizationInArray);
        } else {
						
            this.cities = {
                ...this.cities,
                [city.trim()]: [organizationInArray]
            };
        }
				
				await this.orgstatusModel.findOneAndUpdate(
					{organization:organization.id},
					{
						$setOnInsert:{
							organizationStatus:ORG_STATUS.NOWORK,
							deliveryMetod:[DELIVERY_METODS.COURIER,DELIVERY_METODS.PICKUP],
							paymentMetod:[PAYMENT_METODS.CASH,PAYMENT_METODS.BYCARD]
						}
					},
					{ upsert: true, new: true })

				
        
        
      }

    }
		
		
			
		
      for (let city in this.cities) {
        const cityId = new Types.ObjectId();
				
        const organizations = [];

        
        for (let i = 0; i < this.cities[city].length; i++) {
          const { guid, longitude, latitude, street, workTime, phone,cityguid } = this.cities[city][i];
          
          const objectId = await this.organizationModel.findOneAndUpdate(
            { id: guid },
            {
                $setOnInsert: {
                    id: guid,
                    city: cityId,
										cyid:cityguid,
										isHidden:true,
										address: {
											street,
											longitude,
											latitude
										},
										workTime,
                    phone,
                },
								
            },
            { upsert: true, new: true }
          );

          this.cities[city][i] = {
            ...this.cities[city][i],
            objectId
          };
          organizations.push(objectId);
          
          
        }

        
        
        await this.cityModel.updateOne(
          { name: city },
          {
              $setOnInsert: {
                  _id: cityId,
                  name: city,
									cyid:this.cities[city][0].cityguid
              },
              $set: {
                  organizations
              }
          },
          { upsert: true }
        );

        
        
      }
      
    
  }

  async getNomenclature() {
    let categoriesArray = [];
    let productsArray = [];

    for (let city in this.cities) {
      for (let i = 0; i < this.cities[city].length; i++) {
        await this.getToken();

        const { guid, objectId } = this.cities[city][i];

        const { data } = await axios.post(
          'https://api-ru.iiko.services/api/1/nomenclature',
					{
						organizationId: guid
					},
					{
						headers: { Authorization: `Bearer ${this.token}` }
					}
        );
				

        const revisionFromDatabase = await this.organizationModel.findOne(
            { id: guid },
            { revision: 1 }
        ).lean();

        const { groups, products, revision } = data;

				console.log('ревизия');
        console.log(revisionFromDatabase, revision);

        if (revision === revisionFromDatabase.revision) {
            continue;
        }

        for (let i = 0; i < groups.length; i++) {
            const { name, order, images,imageLinks, id, description } = groups[i];

						//console.log('images',imageLinks);
            if (description === "HIDDEN") {
                continue;
            }

            const image = imageLinks
                ? imageLinks[imageLinks.length - 1]
                : "";

            const category = {
                _id: new Types.ObjectId(),
                id,
                name,
                order,
                organization: objectId,
                image: await this.downloader.download(image, 70)
            };
            categoriesArray.push(category);
        }

        categoriesArray.push({
            _id: new Types.ObjectId(),
            organization: objectId,
            name: "Избранное",
            order: categoriesArray.length,
            image: "/static/shop/favorite.png"
        });

        for (let i = 0; i < products.length; i++) {
            console.log(products[i].name);

            const category = categoriesArray.find(
                (category) => category.id === products[i].parentGroup
            );

            if (!category) {
                continue;
            }



            const {
                name,
                description,
                additionalInfo,
                order,
                id,
                tags,
								code,
                images,
								imageLinks,
                measureUnit,
                weight
            } = products[i];

						const price = products[i].sizePrices[0].price.currentPrice
						

            const image = imageLinks
                ? imageLinks[imageLinks.length - 1]
                : "";
						
            const product = {
                category: category._id,
                organization: objectId,
                name,
                description,
                order,
                id,
                image: await this.downloader.download(image, 300,id),
                additionalInfo,
                tags,
								code,
                measureUnit: measureUnit,
                price,
                weight
            };
            productsArray.push(product);
        }

        await this.categoryModel.deleteMany({ organization: objectId });
        await this.categoryModel.insertMany(categoriesArray);
        categoriesArray = [];

        await this.productModel.deleteMany({ organization: objectId });
        await this.productModel.insertMany(productsArray);
        productsArray = [];

        await this.organizationModel.updateOne(
            { id: guid },
            { $set: { revision } }
        );

        //console.log(data); 
        }
    }
  }
  public async polling() {
    console.log("start pooling");
    await this.getToken();
    await this.getAddresses();
    await this.getNomenclature();
    console.log("end pooling");
  }
}