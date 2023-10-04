export type ISocial = {
	idorganization:string,
	social:{
		vk:string
	}
}

export type IRecvisites = {
	_id:string
	ogrn:string
	inn:string
	name:string
	organization:string
}

export type IGoodPlace = {
	_id: string
	goodplaceid: string
	organization: string
}

export type IOrganization =  {
	_id:string
	id: string;
  address: {
		latitude: number
		longitude: number
		street: string
	};
  city: string;
  phone: string;
  workTime: string;
  delivMetod: string | null;
  isHidden: boolean;
	reservetable:boolean
}

export type IOrganizationPayment = {
	isActive:boolean
	token:string
	merchantId:string
	organization:string
}

export type IOrganizationStatus = {
	_id:string,
	organization:string,
	deliveryMetod:string[]
	organizationStatus:string
	paymentMetod:string[]
	deliveryTime:number
}