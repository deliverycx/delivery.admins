import { BadRequestException, Injectable } from "@nestjs/common";
import { OrganizationHiddenProduct } from "../../../../database/mongodbModel/delivery/hiddenProduct.model";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class OrganizationProductRepository {
	constructor(
		@InjectModel(OrganizationHiddenProduct) private readonly hideProductModel: ReturnModelType<typeof OrganizationHiddenProduct>,
	) { }


	async hiddenProduct(organization: any, productId: any) {

		const result = await this.hideProductModel.findOneAndUpdate(
			{
				organization: organization,
			}, {
			$set: {
				hiddenProduct: productId
			}

		})

		if (!result) {
			return await this.hideProductModel.create({
				organization: organization,
				hiddenProduct: productId
			})
		}
		return result
	}

	async getHiddenProductsByOrg(organization: any) {
		const res = await this.hideProductModel.findOne({ organization })
		return res
	}
}