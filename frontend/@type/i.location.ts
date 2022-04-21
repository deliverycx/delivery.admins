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
  workTime:	string
}

export interface ListOrganization {
  name: string
  organizations:IPoint[]
}