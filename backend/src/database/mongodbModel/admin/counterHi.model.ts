import { buildSchema, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'counterhinkal' } })
export class CounterHinkalModel {

	@prop({ type: () => String })
	public organization: string

	@prop({ type: () => Number })
	public coutn: number

	@prop({ type: () => String })
	public date: string

	@prop({ type: () => String })
	public url: string
}
