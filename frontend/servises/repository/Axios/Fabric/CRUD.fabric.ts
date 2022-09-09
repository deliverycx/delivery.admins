import { InitFabric } from "./FabricApi";

export class CRUDFabric extends InitFabric{
	getAll(id?:string){
		return this.api({
			method: 'get',
			url: `/${this.request}/all?id=${id}`,
		})
	}
	getBuOrg(org:string){
		return this.api({
			method: 'get',
			url: `/${this.request}/buorg?organization=${org}`,
		})
	}
	getBuAllOrg(org:string){
		return this.api({
			method: 'get',
			url: `/${this.request}/buallorg?organization=${org}`,
		})
	}
	getBu(id:string){
		return this.api({
			method: 'get',
			url: `/${this.request}/bu?id=${id}`,
		})
	}
  create(data:any) {
    return this.api({
			method: 'post',
			url: `/${this.request}/add`,
			data: data
		})
  }
	edit(data:any,id:string) {
    return this.api({
			method: 'post',
			url: `/${this.request}/edit?id=${id}`,
			data: data
		})
  }
	setImages(slide:any,data:any) {
    return this.api({
			method: 'post',
			url: `/${this.request}/setImages?id=${slide}`,
			data: data
		})
  }
	delet(id:string) {
    return this.api({
			method: 'post',
			url: `/${this.request}/delet?id=${id}`,
		})
  }
}