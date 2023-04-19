import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { OrganizationTablesClass } from "src/database/mongodbModel/delivery/organizationTables.model";
import { PaymentRecvisitesClass } from "src/database/mongodbModel/delivery/paymentRecvisites.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class OrganizationTablesRepository extends BaseRepository<OrganizationTablesClass>{
  constructor(
    @InjectModel(OrganizationTablesClass) private readonly Model: ReturnModelType<typeof OrganizationTablesClass>,
  ) { 
		super(Model)
	}

	async addTableMetod(body:any){
		const result = await this.Model.create(body)
		console.log(result);
		return result
	}

}