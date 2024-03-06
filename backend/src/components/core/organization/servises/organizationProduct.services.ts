import { Inject, Injectable } from "@nestjs/common";
import {OrganizationProductRepository} from "../repository/organizationProduct.repository";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";


@Injectable()
export class OrganizationProductServices {
    constructor(
        private readonly OrganizationProductRepository: OrganizationProductRepository,
				private readonly iikoAxios:IIkoAxios
    ) {}

    hiddenProductMethod({organization, productId}) {
      return this.OrganizationProductRepository.hiddenProduct(organization, productId)
    }

    getHiddenProductsByOrgMethod({organization}) {
        return this.OrganizationProductRepository.getHiddenProductsByOrg(organization)
    }

		async getOrganizationFoods(id: {organizationId: string}) {
			try {
				const data = await this.iikoAxios.getFoods(id)
			
				return data
			} catch (e) {
				console.log('ERROR', e)
			}
		}
	
}