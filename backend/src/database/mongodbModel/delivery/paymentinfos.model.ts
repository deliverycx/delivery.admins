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
	public token!: string;

	@prop()
	public merchantId!: string;

	@prop({ ref: "Organization" })
	public organization!: Ref<OrganizationClass>; 

}

//export const CityModel = getModelForClass(CityClass);
