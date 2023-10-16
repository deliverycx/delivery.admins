import { Injectable } from "@nestjs/common";
import { Axios, AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosCreate } from "../AxiosCreate";
import {IFoods} from "../../types/global";



@Injectable()
export class IIkoAxios extends AxiosCreate {
	public _axios: AxiosInstance;

	constructor() {
		super(
			process.env.TRANSFER_URL
		);
	}

	private async token() {
		const { data } = await this._axios.post<{token:string}>(
			`/access_token`,
			{
				apiLogin: process.env.TRANSFER_PASSWORD
			}
		);

		return data.token;
	}

	public async getFoods(id: {organizationId: string}) {
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

	public async organizationTables(termital:string){
		const token = await this.token();
		const { data } = await this._axios.post<{restaurantSections:any[]}>(
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

	public async termiralGroops(organization:string) {
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



		return data.terminalGroups[0].items[0].id;
	}

	public async termiralGroopsAlive(organization:string,terminal:string) {
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

}
