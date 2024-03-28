import { ApiSuper, methods, token } from "../AxiosApi";
import { CRUDFabric } from "../Fabric/CRUD.fabric";
import { RequestFabric } from "../Fabric/FabricApi";

namespace Req{
  export type  Login = {
    access_token:string
  }
}
namespace Res{
  export type Login = {
    name: string
    password:string
  }
}


@RequestFabric({
	request:'autorizate',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})
class RequestUsers extends ApiSuper {
	CRUDFabric!:CRUDFabric
 
  @methods('post')
  login(user:Res.Login) {
    return this.request<Req.Login>(`/autorizate/login`)
  }

	
  
  @methods('get')
  check() {
    return this.request(`/autorizate/checkauth`)
  }
}

@RequestFabric({
	request:'register',
	factory:[{
		name:'CRUDFabric',
		fabric:CRUDFabric
	}]
})

class RequestUserRegister  extends ApiSuper {
	CRUDFabric!:CRUDFabric

	@methods('post')
  regUsers(data:any) {
    return this.request<Req.Login>(`/register/registration_admin`)
  }

	@methods('post')
  regSuperUsers(data:any) {
    return this.request<Req.Login>(`/register/registration`)
  }

	@methods('post')
  updateSuperUsers(data:any) {
    return this.request<Req.Login>(`/register/update_user`)
  }

	@methods('post')
  addPagesUser(data:any) {
    return this.request<Req.Login>(`/register/pagesuser`)
  }
	
}

export const requestUserRegister = new RequestUserRegister()
export default new RequestUsers()