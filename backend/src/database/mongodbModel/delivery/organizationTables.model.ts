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
	schemaOptions: { collection: 'organizationtables'}
})
export class OrganizationTablesClass {

	@prop()
	public organization!: string;

	@prop()
	public idsection!: string;

	@prop()
	name!:string

	@prop({ type: () => Array })
	tables!:any[]

}

//export const CityModel = getModelForClass(CityClass);
