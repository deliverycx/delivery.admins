import axios from "axios";
import { async } from "rxjs";
import { DownloadImage } from "src/application/lib/download";
import { GeoCoder } from "src/application/lib/geocoder";
import { Types, Document } from "mongoose";
import { Organization, parseOrganization } from "src/application/lib/parseAddress";

export class UnloadServises {
  private static token: string = '';
  private organizations:any = [];
	private organizationsIds:any = [];
  private geoCoder
  private downloader

  constructor() {
    this.geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);
    this.downloader = new DownloadImage();
  }

  async getToken() {
    try {
			const { data } = await axios.post(
	        'https://api-ru.iiko.services/api/1/access_token',
					{
						apiLogin: "539ecfae"
					}
	    );
					
	    return data.token
    } catch (e) {
        console.log(`Error with get token\n${e}`);
    }
  }
  async getOrganizations() {
    try {
      const token = await this.getToken()
      console.log("starting get organizations");
      const organizationsResponse =  await axios.get(
				'https://api-ru.iiko.services/api/1/organizations',
				{
					headers: { Authorization: `Bearer ${token}` }
				}
			);

			
      const result = Promise.all( organizationsResponse.data.organizations.map(async (organization:any) => {
				const org = await this.getMapOrganization(organization.id)
				
				return parseOrganization(org,this.geoCoder)
				
      }))


			this.organizations = await result
			

			/*
			for (let i = 0; i < organizationsResponse.data.organizations.length; i++){
				const organizationsIds = organizationsResponse.data.organizations[i].id
				const org = await this.getMapOrganization(organizationsIds)

				const res = parseOrganization(org,this.geoCoder)
				console.log(res);
			}
			*/
			
      
    } catch (e) {
        console.log(`Error with get organizations\n${e}`);
    }
  }
	async getMapOrganization(organization:any){
		const token = await this.getToken()

		const {data:resorg} = await axios.post(
			'https://api-ru.iiko.services/api/1/organizations',
			{
				organizationIds: [
					organization
				],
				returnAdditionalInfo: true,
				includeDisabled: true
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return resorg.organizations[0]
	}

  async getOrganizationsResult() {
    await this.getOrganizations()
		console.log(this.organizations);
    return this.organizations
  }

}