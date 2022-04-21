import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../../../../domain/repository/organization.repository";


@Injectable()
export class OrganizationServises{
  constructor(private readonly OrganizationRepository: OrganizationRepository) { }
  
  getAllOrganization() {
    return this.OrganizationRepository.getAllOrganization()
  }
  switchDelivMetod({idorganization,delivmetod}) {
    return this.OrganizationRepository.swtchDelivMetod(idorganization,delivmetod)
  }
}