import { Injectable } from "@nestjs/common";
import { OrganizationRepository } from "../../../../domain/repository/organization.repository";
import axios from 'axios';
import { IIkoAxios } from "src/repository/iiko/iiko.axios";


@Injectable()
export class OrganizationServises{
  constructor(
		private readonly OrganizationRepository: OrganizationRepository,
		private readonly iikoAxios:IIkoAxios
		) { }
  
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

	socialLikeMethod({idorganization, like}) {
	  return this.OrganizationRepository.socialLikeMethod(idorganization, like)
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
		try {
			const termitalid = await this.iikoAxios.termiralGroops(organizationsid)
			if(termitalid.id && organizationsid){
				const terminalAlive = await this.iikoAxios.termiralGroopsAlive(organizationsid,termitalid.id)
				return terminalAlive
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	async getOrganizationFoods(id: {organizationId: string}) {
		try {
			const data = await this.iikoAxios.getFoods(id)
			return data
		} catch (e) {
			console.log('ERROR', e)
		}
	}

	addOrgPhoto(id:any,files:any){
		if(files){
			const imagesMass = files.reduce((acc,images) => {
			acc.push(images.originalname)
				return acc
			},[]);
			this.OrganizationRepository.AddGalleryOrgMetod(id,imagesMass)
		}
	}

	addFiltersServis({filterlist,idorganization}){
		return this.OrganizationRepository.filtersMetod(idorganization,filterlist)
	}

	noiikkoweb({organization,metod}){
		this.OrganizationRepository.noiikkoweb(organization,metod)
	}
}