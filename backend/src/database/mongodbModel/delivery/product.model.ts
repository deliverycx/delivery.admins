import {
    getModelForClass,
    ModelOptions,
    prop,
    Ref
} from "@typegoose/typegoose";
import { CategoryClass } from "./category.model";
import { OrganizationClass } from "./organization.model";
import { Types } from "mongoose";
import { Decimal128 } from "bson";

enum MeasureUnit {
    PIECE = "шт",
    PORTION = "порц"
}

@ModelOptions({
    options: { customName: "Product" },
    schemaOptions: {collection: 'products', versionKey: false, timestamps: true }
})
export class ProductClass {
    @prop({ ref: () => OrganizationClass })
    public organization!: Ref<OrganizationClass>;

    @prop()
    public id!: string;

    @prop()
    public name!: string;

    @prop()
    public description!: string;

    @prop()
    public tags: string[];

		@prop()
    public code: string;

    @prop()
    public additionalInfo!: string;

    @prop()
    public price!: number;

    @prop()
    public weight!: number;

    @prop({ ref: "Category" })
    public category!: Ref<CategoryClass>;

    @prop()
    public image!: string;

    @prop()
    public measureUnit!: string;
}

export const ProductModel = getModelForClass(ProductClass);
