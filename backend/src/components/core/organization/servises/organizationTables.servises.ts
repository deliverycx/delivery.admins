import { Injectable } from "@nestjs/common";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";
import { BaseServises } from "src/services/base.services";
import { OrganizationTablesRepository } from "../repository/organizationTables.repository";


@Injectable()
export class OrganizationTableServises extends BaseServises{
	constructor(
		private readonly organizationRepository: OrganizationTablesRepository,
		private readonly iikoAxios: IIkoAxios
		) { 
			super(organizationRepository);
		}
  
	async getIIkkoTable({idorganization}){
		const termital = await this.iikoAxios.termiralGroops(idorganization)
		const tables = await this.iikoAxios.organizationTables(termital)
		return tables
	}

	async addTables(body:any){
		return this.organizationRepository.addTableMetod(body)
	}

}