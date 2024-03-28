import { ISuperAdminUser } from "@type";
import { action, makeObservable, observable } from "mobx";
import { makePersistable } from "mobx-persist-store";

declare var window: any
export class UsersModel{
	user:ISuperAdminUser | null = null

	constructor() {
		
		makeObservable(this, {
			user: observable,
			actionSetUser: action,
		})
		if (typeof window !== "undefined") {
			makePersistable(this, { name: 'user', properties: ['user'],storage: window.localStorage });
		}
		
		/*
		configure({
			useProxies: "never"
		})
		*/
	}

	actionSetUser(user:ISuperAdminUser){
	
		this.user = user
	}
}

export const userModel = new UsersModel()