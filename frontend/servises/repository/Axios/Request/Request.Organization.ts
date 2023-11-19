import { IPoint, ISocial, ListOrganization } from "@type";
import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  org = IPoint
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
		social?:any
        like?: any
  }
	export type reserve = {
    idorganization: string
		reservetable:boolean
  }
	export type setting = {
    idorganization: string
		phone:string
  }

	export type worktime = {
		idorganization: string
    worktime:string[]
  }

}



class RequestOrganization extends ApiSuper {
 
  @methods('get')
  getAll() {
    return this.request<Req.org>(`/organization/getAll`)
  }

	@methods('get')
  getCityBu(query:string) {
    return this.request<any>(`/organization/getcity?cityid=${query}`)
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
  checkOrganization(metods:Res.OrgBu) {
    return this.request<Req.hiddenMetod>(`/organization/checkorg`)
  }
	@methods('post')
  hiddenCity(metods:Res.hiddenMetod) {
    return this.request<Req.hiddenMetod>(`/organization/cityhidden`)
  }
  
	@methods('post')
  social(data:Res.socialData) {
    return this.request(`/organization/social`)
  }

  @methods('post')
  like(data:Res.socialData) {
      return this.request('/organization/like')
  }

	@methods('get')
  socialBu(query:string) {
    return this.request<{social:any, like: string}>(`/organization/socialbu?idorganization=${query}`)
  }

	@methods('post')
  reserveTable(data:Res.reserve) {
    return this.request(`/organization/reservetable`)
  }

	@methods('post')
	setSetting(data:Res.setting) {
    return this.request(`/organization_setting/setting`)
  }
	
	@methods('post')
  organizationTime(data:Res.worktime) {
    return this.request(`/organization/organizationTime`)
  }
  
	@methods('post')
  organizationAdd(data:any) {
    return this.request(`/organization/organizationAdd`)
  }

	@methods('post')
  organizationDelite(data:any) {
    return this.request(`/organization/organizationDelite`)
  }

	@methods('post')
  CityAdd(data:any) {
    return this.request(`/organization/cityadd`)
  }

	@methods('post')
  redirect(data:any) {
    return this.request(`/organization/organizationRedirect`)
  }

	@methods('post')
  redirectON(data:any) {
    return this.request(`/organization/organizationRedirectON`)
  }

	@methods('post')
  getinfoTerminal(data:any) {
    return this.request(`/organization/organizationTerminal`)
  }

  addCalleryOrg(data:any) {
		console.log(data);
		return this.api({
			method: 'post',
			url: `/organization/addPhoto`,
			data: data
		})
  }
	
	@methods('post')
  addfilter(data:any) {
    return this.request(`/organization/addfilter`)
  }

  
}
export default new RequestOrganization()