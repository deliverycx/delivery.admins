import { Inject, Injectable } from "@nestjs/common";
import {OrganizationProductRepository} from "../../../../domain/repository/prganizationProduct.repository";


@Injectable()
export class OrganizationProductServices {
    constructor(
        private readonly OrganizationProductRepository: OrganizationProductRepository
    ) {}

    hiddenProductMethod({organization, productId}) {
      return this.OrganizationProductRepository.hiddenProduct(organization, productId)
    }

    getHiddenProductsByOrgMethod({organization}) {
        return this.OrganizationProductRepository.getHiddenProductsByOrg(organization)
    }
}