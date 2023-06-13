import { Injectable } from "@nestjs/common";
import { Axios, AxiosInstance, AxiosRequestConfig } from "axios";
import { AxiosCreate } from "../AxiosCreate";



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
						includeDisabled: true
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
