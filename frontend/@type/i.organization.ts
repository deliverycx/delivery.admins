export type ISocial = {
	idorganization:string,
	social:{
		vk:string
	}
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