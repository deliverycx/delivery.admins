import {
    getModelForClass,
    ModelOptions,
    buildSchema,
    prop,
    Ref,
    Severity
} from "@typegoose/typegoose";
import { CityClass } from "./city.model";

@ModelOptions({
    options: { customName: "Organization", allowMixed: Severity.ALLOW },
    schemaOptions: { collection: 'organizations', versionKey: false, timestamps: true }
})
export class OrganizationClass {
    @prop()
    public id!: UniqueId;

    @prop({ ref: "City" })
    public city!: Ref<CityClass>;

    @prop({ type: () => Object })
    public address!: {
        street?: string;
        latitude?: number;
        longitude?: number;
    };

    @prop({ type: () => String })
    public phone!: string;

    @prop({ type: () => Number })
    public revision!: number;

    @prop()
    public workTime!: string[];
    
    @prop({ default: null })
    public delivMetod!: string | null;
    
    @prop({ type: () => Boolean,default:false })
    isHidden:boolean

		@prop()
    public redirect:string

		@prop({ type: () => Boolean,default:false })
    public redirectON:string

		@prop({ type: () => Boolean,default:false })
		reservetable:boolean
    
}

//export const OrganizationModel = getModelForClass(OrganizationClass);
