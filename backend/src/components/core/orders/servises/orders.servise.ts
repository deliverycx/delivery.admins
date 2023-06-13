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

	async mokOrderServises(body: any) {



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
			`http://localhost:5000/product/nomenclature?organization=${body.organization}`,

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


	}
	
	async statusMokOrderServises(body:ordersDTO) {
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
	}
}