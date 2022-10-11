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
	schemaOptions: { collection: 'recvisites'}
})
export class PaymentRecvisitesClass {


	@prop()
	public ogrn!: string;

	@prop()
	public inn!: string;

	@prop()
	public name!: string;

	@prop({ ref: "Organization" })
	public organization!: Ref<OrganizationClass>; 

}
//Recvisites
//export const CityModel = getModelForClass(CityClass);
