import { Inject, Injectable } from "@nestjs/common";
import axios, { Axios, AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosCreate } from "../AxiosCreate";
import { IFoods } from "../../types/global";
import { RedisClient } from "redis";
import { REDIS } from "src/module/redis.module";



@Injectable()
export class IIkoAxios extends AxiosCreate {
	public _axios: AxiosInstance;

	constructor(
		@Inject(REDIS) private readonly redis: RedisClient,
	) {
		super(
			process.env.TRANSFER_URL
		);
	}

	async token() {
		const redisToken = new Promise((resolve, reject) => {
			this.redis.get("token", (err, token) => {
				if (!err) {
					resolve(token)
				} else {
					reject(err)
				}
			});
		})

		const tokeninRedis = await redisToken
		if (tokeninRedis) {
			//console.log('token in redis', tokeninRedis);
			return tokeninRedis
		} else {
			const { data } = await this._axios.post<{ token: string }>(
				`/access_token`,
				{
					apiLogin: process.env.TRANSFER_PASSWORD
				}
			);
			this.redis.set(
				"token",
				data.token,
				"EX",
				10 * 60
			);
			//console.log('token in ikko', data.token);
			return data.token

		}
	}

	public async getOrganizationList() {
		const token = await this.token();
		const { data } = await this._axios.get(`/organizations`,

			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

		return data.organizations
	}

	public async getOrganization(organization:string) {
		const token = await this.token();
		const { data } = await this._axios.post(`/organizations`,
			{
				"organizationIds": [
					organization
				],
				"returnAdditionalInfo": true,
				"includeDisabled": false,
				"returnExternalData": [
					"string"
				]
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

		return data.organizations[0]
	}

	public async getFoods(id: { organizationId: string }) {
		const token = await this.token();

		console.log('ID ORG', id)
		const { data } = await this._axios.post<IFoods>(`/nomenclature`,
			{
				organizationId: id.organizationId
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		console.log(data)
		return data
	}

	public async organizationTables(termital: string) {
		const token = await this.token();
		const { data } = await this._axios.post<{ restaurantSections: any[] }>(
			`/reserve/available_restaurant_sections`,
			{
				"terminalGroupIds": [
					termital
				]
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return data.restaurantSections;
	}

	public async termiralGroops(organization: string) {
		const token = await this.token();
		const { data } = await this._axios.post<any>(
			`/terminal_groups`,
			{
				organizationIds: [
					organization
				],
				includeDisabled: false
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);



		return data.terminalGroups[0].items[0];
	}

	public async termiralGroopsAlive(organization: string, terminal: string) {
		const token = await this.token();
		const { data } = await this._axios.post<any>(
			`/terminal_groups/is_alive`,
			{
				organizationIds: [
					organization
				],
				terminalGroupIds: [
					terminal
				]
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);



		return data.isAliveStatus[0]
	}


	public async getStreetCity(organizationIds: string, cityId: string): Promise<any> {
		const token = await this.token();

		const { data } = await this._axios.post(
			`/streets/by_city`,
			{
				"organizationId": organizationIds,
				"cityId": cityId
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);



		return data.streets
	}

	public async getNomenclature(organization: string): Promise<any> {
		const token = await this.token();

		const { data } = await this._axios.post(
			`/nomenclature`,
			{
				"organizationId": organization
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

			

		return data
	}

	public async getMenuWeb(organization: string[]): Promise<any> {
		const token = await this.token();

		const { data } = await axios.post(
			`https://api-ru.iiko.services/api/2/menu/by_id`,
			{
				"externalMenuId": "14710",
				"organizationIds": organization,
				"priceCategoryId": "00000000-0000-0000-0000-000000000000",
				"version": 0,
				"language": "string"
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

			

		return data
	}


	public async updateIIkkoWebHooks(organizationIds: string, urls: string): Promise<any> {
		const token = await this.token();

		const { data } = await this._axios.post(
			`/webhooks/update_settings`,
			{
				"organizationId": organizationIds,
				"webHooksUri": urls,
				"authToken":"539ecfae"
				
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);



		return data
	}

}
