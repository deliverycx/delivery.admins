import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req{
  export type  Pooling = {
    result:string
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
  
  
}
export default new RequestUpload()