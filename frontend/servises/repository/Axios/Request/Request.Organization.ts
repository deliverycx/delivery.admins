import { ISocial, ListOrganization } from "@type";
import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  org = {
    data:ListOrganization
  }
  export type  DelivMetod = {
    orgid: string,
    delivmetod:string
  }
  export type hiddenMetod = {
    idorganization: string,
    isHidden:boolean
  }
  
}
namespace Res{
  export type DelivMetod = {
    idorganization: string,
    delivmetod:string | null
  }
	export type OrgBu = {
    idorganization: string,
   
  }
  export type hiddenMetod = {
    idorganization: string,
    isHidden:boolean
  }
	export type socialData = {
    idorganization: string
		social:any
  }
	export type reserve = {
    idorganization: string
		reservetable:boolean
  }
}



class RequestOrganization extends ApiSuper {
 
  @methods('get')
  getAll() {
    return this.request<Req.org>(`/organization/getAll`)
  }
	@methods('post')
  getBu(idorg:Res.OrgBu) {
    return this.request<Req.org>(`/organization/getorgbu`)
  }

  @methods('post')
  switchDelivMetod(metods:Res.DelivMetod) {
    return this.request<Req.org>(`/organization/puckup`)
  }

  @methods('post')
  hiddenOrganization(metods:Res.hiddenMetod) {
    return this.request<Req.hiddenMetod>(`/organization/hidden`)
  }
	@methods('post')
  hiddenCity(metods:Res.hiddenMetod) {
    return this.request<Req.hiddenMetod>(`/organization/cityhidden`)
  }
  
	@methods('post')
  social(data:Res.socialData) {
    return this.request(`/organization/social`)
  }

	@methods('get')
  socialBu(query:string) {
    return this.request(`/organization/socialbu?idorganization=${query}`)
  }

	@methods('post')
  reserveTable(data:Res.reserve) {
    return this.request(`/organization/reservetable`)
  }
  
  
}
export default new RequestOrganization()