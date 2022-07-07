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
    @InjectModel(ProductClass) private readonly productModel: ReturnModelType<typeof ProductClass>
  ) {
    this.geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);
    this.downloader = new DownloadImage();
  }

  async getToken() {
    
    const { data } = await axios.get(
        `https://iiko.biz:9900/api/0/auth/access_token?user_id=${process.env.SERVICE_LOGIN}&user_secret=${process.env.SERVICE_PASSWORD}`
    );

    this.token = data
  }
  async getAddresses() {
    const token = this.token;

    const { data } = await axios.get(
      `https://iiko.biz:9900/api/0/organization/list?access_token=${token}`
    );
    this.cities = {};
    for (let i = 0; i < data.length; i++) {
      const organization = data[i];
      if (
        process.env.IIKO_UNLOAD === "prod" &&
        organization.description.match("HIDDEN")
      ) {
        continue;
      }
      const matchesAddress = organization.address.match(
        /(?<city>.*?),\s?(?<street>.*)/i
      );
      if (matchesAddress) {
        const { city, street } = matchesAddress.groups;
        
        const { position } = await this.geoCoder.resolve(
          organization.address
        );

				

        const organizationInArray = {
          street,
          guid: organization.id,
          longitude: position[0],
          latitude: position[1],
          workTime: organization.workTime.split(";")[0],
          phone: organization.phone
        };

        if (city in this.cities) {
          this.cities[city.trim()].push(organizationInArray);
        } else {
            this.cities = {
                ...this.cities,
                [city.trim()]: [organizationInArray]
            };
        }
        
        
      }

    }

      for (let city in this.cities) {
        const cityId = new Types.ObjectId();
        const organizations = [];

        
        for (let i = 0; i < this.cities[city].length; i++) {
          const { guid, longitude, latitude, street, workTime, phone } = this.cities[city][i];
          
          const objectId = await this.organizationModel.findOneAndUpdate(
            { id: guid },
            {
                $setOnInsert: {
                    id: guid,
                    city: cityId,
                },
                $set: {
										address: {
											street,
											longitude,
											latitude
										},
                    phone,
                    workTime
                }
            },
            { upsert: true, new: true }
          );

          this.cities[city][i] = {
            ...this.cities[city][i],
            objectId
          };
          organizations.push(objectId);
          
          
        }

        console.log('id city',cityId)
        
        await this.cityModel.updateOne(
          { name: city },
          {
              $setOnInsert: {
                  _id: cityId,
                  name: city
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
        const { data } = await axios.get(
          `https://iiko.biz:9900/api/0/nomenclature/${guid}?access_token=${this.token}`
        );

        const revisionFromDatabase = await this.organizationModel.findOne(
            { id: guid },
            { revision: 1 }
        ).lean();

        const { groups, products, revision } = data;

        console.log(revisionFromDatabase, revision);

        if (revision === revisionFromDatabase.revision) {
            continue;
        }

        for (let i = 0; i < groups.length; i++) {
            const { name, order, images, id, description } = groups[i];

            if (description === "HIDDEN") {
                continue;
            }

            const image = images
                ? images[images.length - 1]?.imageUrl
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
                price,
                tags,
								code,
                images,
                measureUnit,
                weight
            } = products[i];

            const image = images
                ? images[images.length - 1]?.imageUrl
                : "";

            console.log(objectId);
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

        console.log(data); 
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