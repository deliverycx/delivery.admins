import { ListOrganization } from "@type";
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
  export type hiddenMetod = {
    idorganization: string,
    isHidden:boolean
  }
}



class RequestOrganization extends ApiSuper {
 
  @methods('get')
  getAll() {
    return this.request<Req.org>(`/organization/getAll`)
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
  
  
  
}
export default new RequestOrganization()