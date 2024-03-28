export type IAdminUser = {
	_id:string
	name:string
	password:string
	role:string
	organization:string
}

export type ISuperAdminUser = {
	_id:string
	name:string
	password:string
	role:string
	pagesUser:[]
}

export type User = {
  isLoggedIn: boolean
	name:string
	role:string
	pagesUser:any[]
	organization:string
}