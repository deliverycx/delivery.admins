import { buildSchema, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { GroopsModel } from "./groops.model";
import { MainBannerModel } from "./mainBanner.model";

@modelOptions({ schemaOptions: { collection: 'counterhinkal' } })
export class CounterHinkalModel{

	@prop()
  public organization:string

	@prop()
	public coutn:number

	@prop()
	public date:string

}
