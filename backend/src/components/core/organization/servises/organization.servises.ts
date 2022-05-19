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
  hiddenOranizationMetod({idorganization,isHidden}) {
    return this.OrganizationRepository.hiddenOranizationMetod(idorganization,isHidden)
  }
	hiddenCityMetod({idorganization,isHidden}) {
    return this.OrganizationRepository.hiddenCityMetod(idorganization,isHidden)
  }
}