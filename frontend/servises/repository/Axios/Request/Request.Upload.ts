import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  Pooling = {
    result:string
  }
  export type  PoolingOrganization = {
    result:any
  }
}
namespace Res{
  export type Pooling = {
    result:string
  }
}



class RequestUpload extends ApiSuper {
 
  @methods('post')
  Pooling() {
    return this.request<Req.Pooling>(`/unload/pooling`)
  }
  @methods('get')
  PoolingOrganization() {
    return this.request<Req.PoolingOrganization>(`/unload/organizations`)
  }
  
  
}
export default new RequestUpload()