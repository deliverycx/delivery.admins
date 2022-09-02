import { buildSchema, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { MainBannerModel } from "./mainBanner.model";

@modelOptions({ schemaOptions: { collection: 'groops' } })
export class GroopsModel{

	@prop({ type: () => String })
  public name:string

	@prop({ type: () => String })
  public category:string

	@prop({ ref: () => MainBannerModel }) 
	public groop: Ref<MainBannerModel>[];

}
