import axios from "axios";
import { async } from "rxjs";
import { DownloadImage } from "src/application/lib/download";
import { GeoCoder } from "src/application/lib/geocoder";
import { Types, Document } from "mongoose";
import { Organization, parseOrganization } from "src/application/lib/parseAddress";

export class UnloadServises {
  private static token: string = '';
  private organizations: Organization[] = [];
  private geoCoder
  private downloader

  constructor() {
    this.geoCoder = new GeoCoder(process.env.YANDEX_APIKEY);
    this.downloader = new DownloadImage();
  }

  async getToken() {
    try {
        const tokenResponse = await axios.get<string>(`https://iiko.biz:9900/api/0/auth/access_token?user_id=${process.env.SERVICE_LOGIN}&user_secret=${process.env.SERVICE_PASSWORD}`);
        return tokenResponse.data;
    } catch (e) {
        console.log(`Error with get token\n${e}`);
    }
  }
  async getOrganizations() {
    try {
      const token = await this.getToken()
      console.log("starting get organizations");
      const organizationsResponse = await axios.get(`https://iiko.biz:9900/api/0/organization/list?access_token=${token}`);

      this.organizations =organizationsResponse.data.map(organization => {
        return parseOrganization(organization, this.geoCoder);
       
      })
      
    } catch (e) {
        console.log(`Error with get organizations\n${e}`);
    }
  }
  async getOrganizationsResult() {
    await this.getOrganizations()
    //console.log(this.organizations)
    return this.organizations
  }

}