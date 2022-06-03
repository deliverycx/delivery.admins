import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: 'social' } })
export class SocialModel{
  @prop({ type: () => String })
  public idorganization: string
  
	@prop({ type: () => Object })
  public social:any
}