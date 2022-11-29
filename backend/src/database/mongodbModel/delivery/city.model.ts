import {
    getModelForClass,
    ModelOptions,
    mongoose,
    prop,
    Ref
} from "@typegoose/typegoose";
import { OrganizationClass } from "./organization.model";
import { Types } from "mongoose";

@ModelOptions({
    options: { customName: "City" },
    schemaOptions: { collection: 'cities',versionKey: false, timestamps: true }
})
export class CityClass {
    
    @prop()
    public name!: string;

		@prop()
    public cyid!: string;

    @prop({ ref: "Organization" })
    public organizations: Ref<OrganizationClass>[];

		@prop({ type: () => Boolean,default:true }) 
    isHidden:boolean
}

//export const CityModel = getModelForClass(CityClass);
