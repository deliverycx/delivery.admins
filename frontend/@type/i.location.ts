export interface ICity {
  id: string,
  name: string
}
export interface IPoint {
  id:	string
  address: {
    latitude: number,
    longitude: number,
    street: string
  }
  city:	string
  phone:	string
  workTime: string
  delivMetod: string | null
  isHidden:boolean
	nomenuweb:boolean
}

export interface ListOrganization {
	_id:string
  name: string
  organizations:IPoint[]
	isHidden:boolean
}