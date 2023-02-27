import { OrderStatus } from "application/contstans/order.const"

export type IPayMaster = {
	_id:string
	token:string
	merchantId:string
	organization:string
}

export type IRecvisites = {
	_id:string
	ogrn:string
	inn:string
	name:string
	organization:string
}

export type IOrderPayment = {
	_id:string
	paymentid:number
	idorganization:string
	merchantId:string
	paymentStatus:string
	orderStatus:'Unconfirmed'
	orderAmount:number
	paymentAmount:number,
	orderId:string
	orderNumber:number
	paymentData:{
		paymentMethod:string,
		paymentInstrumentTitle:string
	}
	dyalPayment:{
		BarPaymentAmount: number
​​		BarPaymentid:string
	}
	paymentparams:{
		organization:string
		address_city:string
		address_home:string
		address_street:string
		orderType:string
		phone:string
		date:string
	},
	orderItems:IorderItems[]
}

export type IorderItems = {
	product:{
		id:string,
		name:string
	},
	price:number
	cost:number,
	amount:number
}