import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../../../../domain/repository/organization.repository";
import axios from 'axios';


@Injectable()
export class OrganizationServises{
  constructor(private readonly OrganizationRepository: OrganizationRepository) { }
  
  getAllOrganization() {
    return this.OrganizationRepository.getAllOrganization()
  }
	getSityBu({cityid}){
		return this.OrganizationRepository.findCity(cityid)
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
	checkOranizationMetod({idorganization}) {
    return this.OrganizationRepository.checkOranizationMetod(idorganization)
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
	
	organizationTime({idorganization,worktime}){
		return this.OrganizationRepository.OrganizationTimeMetod(idorganization,worktime)
	}

	addCity(city: any){
		return this.OrganizationRepository.addCityMetod(city)
	}

	organizationAdd(org: any){
		return this.OrganizationRepository.addOrganizationMetod(org)
	}

	organizationDelite({id}){
		return this.OrganizationRepository.DeliteOrgMetod(id)
	}

	organizationRedirect({idorganization,redirect}){
		return this.OrganizationRepository.RedirectOrgMetod(idorganization,redirect)
	}
	organizationRedirectON({idorganization,redirectON}){
		return this.OrganizationRepository.RedirectONOrgMetod(idorganization,redirectON)
	}
	async organizationTerminal(organizationsid:string){
		const { data:ikkotoken } = await axios.post(
				'https://api-ru.iiko.services/api/1/access_token',
				{
					apiLogin: "539ecfae"
				}
		);
		const token = ikkotoken.token
		const {data:getTerminal} = await axios.post(
				'https://api-ru.iiko.services/api/1/terminal_groups',
				{
					organizationIds: [
						organizationsid
					],
					includeDisabled: true
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);

			const terminal = getTerminal.terminalGroups[0].items[0].name
			return terminal
		}
}