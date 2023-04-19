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

	@prop()
	public organization!: string; 

}
//Recvisites
//export const CityModel = getModelForClass(CityClass);
