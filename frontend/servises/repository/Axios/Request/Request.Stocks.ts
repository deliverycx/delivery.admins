import { AxiosInstance } from "axios";
import { ApiSuper, methods } from "../AxiosApi";
import Api from "../AxiosCreate";

class RequestStocks  extends ApiSuper{
	protected readonly api: AxiosInstance = Api.getInstance.api;
	
	getAll(){
		return this.api({
			method: 'get',
			url: `/stocks/all`,
		})
	}
	getBuOrg(org:string){
		return this.api({
			method: 'get',
			url: `/news/buorg?organization=${org}`,
		})
	}
	getBu(slide:string){
		return this.api({
			method: 'get',
			url: `/stocks/bu?id=${slide}`,
		})
	}
  create(data:any) {
    return this.api({
			method: 'post',
			url: `/stocks/add`,
			data: data
		})
  }
	edit(data:any,slide:string) {
    return this.api({
			method: 'post',
			url: `/stocks/edit?id=${slide}`,
			data: data
		})
  }
	delet(slide:string) {
    return this.api({
			method: 'post',
			url: `/stocks/delet?id=${slide}`,
		})
  }
}
export default new RequestStocks()