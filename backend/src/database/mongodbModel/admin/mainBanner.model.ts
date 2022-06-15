import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'mainbanner' } })
export class MainBannerModel{
  @prop({ type: () => Array })
  public images: string[]
  
	@prop({ type: () => String })
  public organization:string

	@prop({ type: () => String })
  public url:string

	@prop({ type: () => Array })
  public smallimages: string[]

	@prop({ type: () => Array })
  public mobimages: string[]

	@prop({ type: () => Number,default:() => 0 })
  public order:number
}