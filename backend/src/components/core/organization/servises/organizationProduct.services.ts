import { Inject, Injectable } from "@nestjs/common";
import { OrganizationProductRepository } from "../repository/organizationProduct.repository";
import { IIkoAxios } from "src/repository/iiko/iiko.axios";
import * as fs from "fs"
import { join } from 'path';

@Injectable()
export class OrganizationProductServices {
	constructor(
		private readonly OrganizationProductRepository: OrganizationProductRepository,
		private readonly iikoAxios: IIkoAxios
	) { }

	hiddenProductMethod({ organization, productId }) {
		return this.OrganizationProductRepository.hiddenProduct(organization, productId)
	}

	getHiddenProductsByOrgMethod({ organization }) {
		return this.OrganizationProductRepository.getHiddenProductsByOrg(organization)
	}

	async getOrganizationFoods(organization: string) {
		const file = JSON.parse(fs.readFileSync(join(process.cwd() + `/public/static/menu/${organization}.json`), 'utf8'));
		if (file) {
			const result = await this.getNomenClature(file, organization)
			return result
		}
		return null
	}


	async getNomenClature(nomenclature: any, organization: string) {

		//console.log(organization);


		const categoryes = this.NomenClatureCategory(nomenclature.groups, organization)
		const products = this.NomenClatureProducts(nomenclature.products)

		return {
			categoryes: categoryes.length !== 0 ? categoryes : null,
			products: products.length !== 0 ? products : null
		}
	}


	NomenClatureCategory(category: any[], organization: string) {
		const cat = category.map((value) => {
			const { name, order, images, imageLinks, id, description, tags } = value;
			const image = imageLinks
				? imageLinks[imageLinks.length - 1]
				: "";

			const category = {
				organization: organization,
				id,
				name,
				order,
				description,
				image: image,
				tags

			};
			return category

		}).filter(item => item.description !== 'HIDDEN').sort((a: any, b: any) => (a.order - b.order))

		/*
		cat.push({
			_id: new Types.ObjectId(),
			id: 'favorite',
			organization: organization,
			name: "Избранное",
			order: cat.length,
			description: '',
			image: "/static/shop/favorite.png"
		});
		*/
		return cat
	}

	NomenClatureProducts(products: any) {
		const prods = products.map((prod: any) => {
			const {
				name,
				parentGroup,
				description,
				additionalInfo,
				order,
				id,
				tags,
				code,
				images,
				imageLinks,
				measureUnit,
				weight,

			} = prod;


			const price = Math.trunc(prod.sizePrices[0].price.currentPrice)


			const image = imageLinks
				? imageLinks[imageLinks.length - 1]
				: "";

			const product = {
				category: parentGroup,
				name,
				description,
				order,
				id,
				productId: id,
				image: image,
				additionalInfo,
				tags,
				code,
				measureUnit: measureUnit,
				price,
				weight
			};


			return product
		})
		return prods
	}


}