import { Injectable, Inject } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { ordersRepository } from "../repository/orders.repository";
import axios from 'axios';
import { ordersDTO } from "../dto/orders.dto";

@Injectable()
export class ordersServises extends BaseServises {
	constructor(
		@Inject(ordersRepository)
		private readonly Repository,


	) {
		super(Repository);

	}


	async getAllOrderMetod(query: any = {}, limit: number) {
		return this.Repository.getAllOrder(query, limit)
	}
	async getAllOrderErrorsMetod() {
		return this.Repository.getAllOrderErrors()
	}

	async mokOrderServises(body: any) {
		console.log('созал мок', body);

		try {


			const { data: ikkotoken } = await axios.post(
				'https://api-ru.iiko.services/api/1/access_token',
				{
					apiLogin: process.env.TRANSFER_PASSWORD
				}
			);
			const token = ikkotoken.token
			const { data: ikkoterminal } = await axios.post(
				'https://api-ru.iiko.services/api/1/terminal_groups',
				{
					organizationIds: [
						body.organization
					],
					includeDisabled: true
				},
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);
			const terminal = ikkoterminal.terminalGroups[0].items[0].id
			const { data: nomenclature } = await axios.get(
				`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://xn--80apgfh0ct5a.xn--p1ai/api'}/product/nomenclature?organization=${body.organization}`,

			);
			const product = nomenclature.products[0]


			const bodyOrder = {
				"organizationId": body.organization,
				"terminalGroupId": terminal,
				"createOrderSettings": {
					"mode": "Async"
				},
				"order": {
					"phone": "+7 978 755 46 54",
					"customer": {
						"name": "test",
						"comment": "+7 978 755 46 54"
					},
					"deliveryPoint": {
						"address": {
							"street": {
								"classifierId": "91000007000034900",
								"city": "Симферополь"
							},
							"house": "1",
							"floor": "5",
							"flat": "5",
							"entrance": "5",
							"doorphone": "5"
						}
					},
					"guests": {
						"count": 1,
						"splitBetweenPersons": false
					},
					"items": [
						{
							"type": "Product",
							"productId": product.id,
							"modifiers": [],
							"amount": 5
						}
					],

					"comment": "test oplata card",
					"orderTypeId": "9ee06fcc-8233-46fa-b74d-ff6f50128afb"
				}
			}

			const { data: order } = await axios.post('https://api-ru.iiko.services/api/1/deliveries/create', bodyOrder,
				{
					headers: { Authorization: `Bearer ${token}` }
				})

			return order
		} catch (error) {
			console.log(error);
		}

	}

	async statusMokOrderServises(body: ordersDTO) {
		try {


			const { data: ikkotoken } = await axios.post(
				'https://api-ru.iiko.services/api/1/access_token',
				{
					apiLogin: process.env.TRANSFER_PASSWORD
				}
			);
			const token = ikkotoken.token
			console.log(body);
			const { data: order } = await axios.post('https://api-ru.iiko.services/api/1/deliveries/by_id',
				{
					"organizationId": body.organization,
					"orderIds": [
						body.orderid
					]
				}
				,
				{
					headers: { Authorization: `Bearer ${token}` }
				})

			return order.orders[0]

		} catch (error) {
			console.log(error);
		}
	}


	async gamerser() {
		const { data } = await axios.get("http://xn--80aimpg.xn--80aafg6avvi.xn--80apgfh0ct5a.xn--p1ai/admin/orderDelivery/buOrg?organization=undefined&limit=1000")
		const regex = new RegExp('gamer' + "-\\d+"); //'fourhach' 'gamer'

		const gamers = new Set()

		const q = data.map((values: any, index: number) => {
			/**/
			if (values.orderStatus === "Success") {
				values.orderItems.map((item: any, i: number) => {

					//console.log(item.productTags);
					const tagIndex = item.productTags.includes('fourhach')


					if (tagIndex) {
						//const duble = new Set(`${values.orderParams.name} - ${values.orderParams.phone}:${values.orderParams.date}`)
						gamers.add(`${values.orderParams.name} - ${values.orderParams.phone} - ${values.orderParams.date}`)
					}
				})
			}



		})

		let tik = 0

		gamers.forEach((value, valueAgain, set) => {
			++tik
			console.log(tik, valueAgain);
		});


		return data
	}
}