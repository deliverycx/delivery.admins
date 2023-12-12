import {BadRequestException, Injectable} from "@nestjs/common";
import {OrganizationHiddenProduct} from "../../../../database/mongodbModel/delivery/hiddenProduct.model";
import {InjectModel} from "nestjs-typegoose";
import {ReturnModelType} from "@typegoose/typegoose";

@Injectable()
export class OrganizationProductRepository {
    constructor(
        @InjectModel(OrganizationHiddenProduct) private readonly hideProductModel: ReturnModelType<typeof OrganizationHiddenProduct>,
    ) { }


    async hiddenProduct(organization: any, productId: any) {
		const candidateOrganization = await this.hideProductModel.findOne({ organization })
		const candidateProduct = await this.hideProductModel.findOne({
			organization: organization,
			hiddenProduct: {
				$in: productId
			}
		})

		if(candidateProduct) {
			const updated = await this.hideProductModel.findOneAndUpdate({
				organization: organization,
				hiddenProduct: {
					$in: productId
				}
			}, { $pull: { hiddenProduct: productId }}, {new: true})

			return await updated.save()
		}

		if(candidateOrganization) {
			const res = await this.hideProductModel.findOneAndUpdate({ organization }, {
				$push: {
					hiddenProduct: productId
				}
			})

			return res
		}

		const res = await this.hideProductModel.create({
			organization,
			hiddenProduct: [productId]
		})

		return res
    }

	async getHiddenProductsByOrg(organization: any) {
		const res = await this.hideProductModel.findOne({ organization })
		return res
	}
}