import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'mainbanner' } })
export class MainBannerModel{
  @prop({ type: () => Array })
  public images: string[]
  
	@prop({ type: () => String })
  public organization:string
}