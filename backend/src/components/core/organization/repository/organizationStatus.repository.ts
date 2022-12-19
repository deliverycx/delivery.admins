import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";


@Injectable()
export class OrganizationStatusRepository{
  constructor(
    @InjectModel(OrganizationStatusClass) private readonly Model: ReturnModelType<typeof OrganizationStatusClass>,
  ) {}

	async getOrgStatusMetod(organization:string){
		return await this.Model.findOne({
			organization
		})
	}

	async updateStatusMetod(organization:string,metod:Record<string,string[] | string> ){
		
		return await this.Model.findOneAndUpdate(
			{
				organization
			},
			{
				$set:{
					...metod
				}
			}
		)
	}
}