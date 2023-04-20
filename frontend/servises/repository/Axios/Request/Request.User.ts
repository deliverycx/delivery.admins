import { ApiSuper, methods, token } from "../AxiosApi";

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



class RequestUsers extends ApiSuper {
 
  @methods('post')
  login(user:Res.Login) {
    return this.request<Req.Login>(`/autorizate/login`)
  }
  
  @methods('get')
  check() {
    return this.request(`/autorizate/checkauth`)
  }
}
export default new RequestUsers()