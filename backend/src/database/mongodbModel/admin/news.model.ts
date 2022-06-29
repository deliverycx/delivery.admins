import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'news' } })
export class NewsModel{
  @prop({ type: () => Array })
  public images: string[]
  
	@prop({ type: () => String })
  public link:string
}