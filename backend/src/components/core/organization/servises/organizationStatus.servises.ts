import { Injectable } from "@nestjs/common";
import { OrganizationStatusRepository } from "../repository/organizationStatus.repository";



@Injectable()
export class OrganizationStatusServises{
  constructor(private readonly OrganizationRepository: OrganizationStatusRepository) { }
  

	

}