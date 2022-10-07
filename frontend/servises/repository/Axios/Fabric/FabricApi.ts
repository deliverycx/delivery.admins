import { AxiosInstance } from "axios";
import Api from "../AxiosCreate";

interface factory {
	name:string,
	fabric:any
}

export function RequestFabric(filter:{
	request:string,
	factory:factory[]
}) {
	return function<T extends {new (...args: any[]): {}}>(targetConstructor:T):T { 
		return class extends targetConstructor{
			[x: string]: any;
			constructor(...args:any) {
				super(...args);
				filter.factory.forEach((val:factory ) => {
					this[val.name] = new val.fabric(filter.request)
				})
				
			}
		}
	}
}


export abstract class InitFabric{
	protected readonly api: AxiosInstance = Api.getInstance.api;
	constructor(
		protected readonly request:string){}
}