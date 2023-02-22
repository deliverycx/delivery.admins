import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'paymentorders' } })
export class PaymentModel{
  @prop({ type: () => String })
  public idorganization: string

	@prop({ type: () => Number })
	public paymentid:number

	@prop({ type: () => String })
	public merchantId:string

	@prop({ type: () => String })
	public paymentStatus:string

	@prop()
	public dyalPayment:any

	@prop({ type: () => Number })
	public paymentAmount:number

	@prop({ type: () => String })
	public paymentTime:string

	@prop({ type: () => Object })
	public paymentparams:any

	@prop({ type: () => Object })
	public paymentData:any

	@prop({ type: () => String })
	public orderId:string

	@prop()
	public orderNumber:number

	@prop({ type: () => String })
	public orderStatus:string

	@prop({ type: () => Number })
	public orderAmount:number

	@prop({ type: () => Object })
	public orderItems:any
}