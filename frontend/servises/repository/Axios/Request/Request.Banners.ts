import { AxiosInstance } from "axios";
import { ApiSuper, methods } from "../AxiosApi";
import Api from "../AxiosCreate";

class RequestBanners  extends ApiSuper{
	protected readonly api: AxiosInstance = Api.getInstance.api;
	
	getAll(org?:string){
		return this.api({
			method: 'get',
			url: `/mainbanner/all?organization=${org}`,
		})
	}
	getBuOrg(org:string){
		return this.api({
			method: 'get',
			url: `/mainbanner/buorg?organization=${org}`,
		})
	}
	getBuAllOrg(org:string){
		return this.api({
			method: 'get',
			url: `/mainbanner/buallorg?organization=${org}`,
		})
	}
	getBu(slide:string){
		return this.api({
			method: 'get',
			url: `/mainbanner/bu?id=${slide}`,
		})
	}
  create(data:any) {
    return this.api({
			method: 'post',
			url: `/mainbanner/add`,
			data: data
		})
  }
	edit(data:any,slide:string) {
    return this.api({
			method: 'post',
			url: `/mainbanner/edit?id=${slide}`,
			data: data
		})
  }
	setImages(slide:any,data:any) {
    return this.api({
			method: 'post',
			url: `/mainbanner/setImages?id=${slide}`,
			data: data
		})
  }
	delet(slide:string) {
    return this.api({
			method: 'post',
			url: `/mainbanner/delet?id=${slide}`,
		})
  }
}
export default new RequestBanners()