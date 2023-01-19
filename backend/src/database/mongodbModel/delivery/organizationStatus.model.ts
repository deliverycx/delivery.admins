import {
	getModelForClass,
	ModelOptions,
	mongoose,
	prop,
	Ref
} from "@typegoose/typegoose";
import { OrganizationClass } from "./organization.model";
import { Types } from "mongoose";
import { DELIVERY_METODS, ORG_STATUS, PAYMENT_METODS } from "src/application/constants/const.orgstatus";

@ModelOptions({
	schemaOptions: { collection: 'organizationstatus'}
})
export class OrganizationStatusClass {

	@prop()
	public organization!: string;

	@prop({ type: () => Array, default: [DELIVERY_METODS.COURIER,DELIVERY_METODS.PICKUP] })
	public deliveryMetod!: string[] | null;

	@prop({default:ORG_STATUS.NOWORK})
	organizationStatus!:string

	@prop({ type: () => Array, default: [PAYMENT_METODS.CASH,PAYMENT_METODS.BYCARD] })
	public paymentMetod!: string[] | null;

}

//export const CityModel = getModelForClass(CityClass);
