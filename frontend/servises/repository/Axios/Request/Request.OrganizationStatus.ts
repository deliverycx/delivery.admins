import { IOrganizationStatus } from "@type"
import { ApiSuper, methods } from "../AxiosApi"


class RequestOrganizationStatus  extends ApiSuper {

	@methods('get')
  getTables(query:string) {
    return this.request<IOrganizationStatus>(`/organization_status/getstatus/?organization=${query}`)
  }

	@methods('post')
  update(body:any) {
    return this.request(`/organization_status/update`)
  }
}
export default new RequestOrganizationStatus()