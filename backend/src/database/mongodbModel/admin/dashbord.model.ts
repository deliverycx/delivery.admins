import { buildSchema, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { GroopsModel } from "./groops.model";
import { MainBannerModel } from "./mainBanner.model";

@modelOptions({ schemaOptions: { collection: 'dashbord' } })
export class DashbordModel{

	@prop({ type: () => Boolean,default: false })
  public guestvip:boolean

}
