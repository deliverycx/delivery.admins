import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'stocks' } })
export class StocksModel{
  @prop({ type: () => Array })
  public images: string[]
  
	@prop({ type: () => String })
  public link:string
}