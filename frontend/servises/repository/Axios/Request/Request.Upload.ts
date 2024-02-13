import { ApiSuper, methods, token } from "../AxiosApi";

namespace Req {
	export type Pooling = {
		result: string
	}
	export type PoolingOrganization = {
		result: any
	}
	export type terminalOrganization = {
		idtermital: string,
		organizationid: string,
		adress: string
	}
}
namespace Res {
	export type Pooling = {
		result: string
	}
	export type webhooks = {
		organization: string
		localhoste:string
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
	@methods('get')
	getIIkkoOrganizations() {
		return this.request<Req.PoolingOrganization>(`/unload/iikkoOrganizations`)
	}
	@methods('get')
	getIIkkoOrganizationInfo(org: string) {
		return this.request<Req.terminalOrganization>(`/unload/iikkoOrganizationInfo?organization=${org}`)
	}

	@methods('get')
	poolingOrganization(org: string) {
		return this.request<Req.terminalOrganization>(`/unload/poolingOrganization?organization=${org}`)
	}

	@methods('post')
	ikkowebhooks(body: Res.webhooks) {
		return this.request<Req.terminalOrganization>(`/unload/updateWebHooks`)
	}

}
export default new RequestUpload()