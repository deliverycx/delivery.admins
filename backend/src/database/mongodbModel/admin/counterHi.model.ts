import { buildSchema, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'counterhinkal' } })
export class CounterHinkalModel {
	@prop({
		validate: {
			validator: function (v: any) {
				return Types.ObjectId.isValid(v);
			},
			message: props => `${props.value} is not a valid ObjectId!`
		}
	})
	_id!: Types.ObjectId;

	@prop({ type: () => String })
	public organization: string

	@prop({ type: () => Number })
	public coutn: number

	@prop({ type: () => String })
	public date: string

}
