import {
    getModelForClass,
    ModelOptions,
    prop,
    Ref
} from "@typegoose/typegoose";
import { OrganizationClass } from "./organization.model";
import { ImagePath } from "src/types/global";

@ModelOptions({
    options: { customName: "Category" },
    schemaOptions: {  collection: 'categories', versionKey: false, timestamps: true }
})
export class CategoryClass {
    @prop({ required: false })
    public id!: string;

    @prop()
    public name!: string;

    @prop()
    public image!: string;

    @prop()
    public order!: number;

    @prop({ ref: () => OrganizationClass })
    public organization!: Ref<OrganizationClass>;
}

export const CategoryModel = getModelForClass(CategoryClass);
