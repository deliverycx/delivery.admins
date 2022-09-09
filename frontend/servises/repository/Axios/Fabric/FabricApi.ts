import { AxiosInstance } from "axios";
import Api from "../AxiosCreate";

export function RequestFabric(filter:{
	request:string,
	fabric:any[]
}) {
	return function<T extends {new (...args: any[]): {}}>(targetConstructor:T):T { 
		return class extends targetConstructor{
			[x: string]: any;
			constructor(...args:any) {
				super(...args);
				filter.fabric.forEach((Component:typeof Function) => {
					this[Component.name] = new Component(filter.request)
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