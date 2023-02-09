export type IAdminUser = {
	_id:string
	name:string
	password:string
	role:string
	organization:string
}

export type User = {
  isLoggedIn: boolean
}