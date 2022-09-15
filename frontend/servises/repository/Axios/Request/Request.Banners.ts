import { AxiosInstance } from "axios";
import { ApiSuper } from "../AxiosApi";
import Api from "../AxiosCreate";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from '../Fabric/FabricApi';

@RequestFabric({
	request:'mainbanner',
	fabric:[CRUDFabric]
})
class RequestGroops  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	getAll(data:{org?:string}){
		return this.api({
			method: 'get',
			url: `/mainbanner/all?organization=${data?.org}`,
		})
	}

	getBu(data: {slide:string}){
		return this.api({
			method: 'get',
			url: `/mainbanner/bu?id=${data.slide}`,
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
