import {
	getModelForClass,
	ModelOptions,
	mongoose,
	prop,
	Ref
} from "@typegoose/typegoose";
import { OrganizationClass } from "./organization.model";
import { Types } from "mongoose";

@ModelOptions({
	schemaOptions: { collection: 'paymentinfos'}
})
export class PaymentinfosClass {

	@prop({ type: () => Boolean,default:false })
	public isActive!: boolean;

	@prop()
	public name!: string;

	@prop()
	public token!: string;

	@prop()
	public merchantId!: string;

	@prop()
	public organization!: string; 

	@prop()
	public typemagaz!: string; 

}

//export const CityModel = getModelForClass(CityClass);
