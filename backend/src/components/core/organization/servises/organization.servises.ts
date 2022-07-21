import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../../../../domain/repository/organization.repository";


@Injectable()
export class OrganizationServises{
  constructor(private readonly OrganizationRepository: OrganizationRepository) { }
  
  getAllOrganization() {
    return this.OrganizationRepository.getAllOrganization()
  }
	getBuOrganization({idorganization}) {
    return this.OrganizationRepository.getBuOrganization(idorganization)
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
	socialMetod({idorganization,social}){
		return this.OrganizationRepository.socialMetod(idorganization,social)
	}
	socialMetodBu({idorganization}){
		return this.OrganizationRepository.socialMetodBu(idorganization)
	}

	reservetable({idorganization,reservetable}){
		return this.OrganizationRepository.reservetableMetod(idorganization,reservetable)
	}
	

}