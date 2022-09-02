import { buildSchema, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { GroopsModel } from "./groops.model";
import { MainBannerModel } from "./mainBanner.model";

@modelOptions({ schemaOptions: { collection: 'displaybanner' } })
export class DisplayBannerModel{

	@prop({ type: () => String })
  public organization:string

	@prop({ ref: () => GroopsModel }) 
	public groopbanner: Ref<GroopsModel>[];

	@prop({ ref: () => MainBannerModel }) 
	public banners!: Ref<MainBannerModel>[];

}
