import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../../../../domain/repository/organization.repository";


@Injectable()
export class OrganizationSettingServises{
  constructor(private readonly OrganizationRepository: OrganizationRepository) { }
  
  settingOrganization({idorganization,...arg}){
		return this.OrganizationRepository.settingOrgMetod(idorganization,arg)
	}
	

}