import {
	getModelForClass,
	modelOptions,
	ModelOptions,
	mongoose,
	prop,
	Ref,
	Severity
} from "@typegoose/typegoose";


@modelOptions({ schemaOptions: { collection: 'organizationfilter' } })
export class OrganizationfilterModel {

	@prop()
	public name!: string;

	@prop()
	public images!: [];
	

}