import {
    ModelOptions,
    prop,
} from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: { collection: 'goodplace'}
})

export class OrganizationGoodPlace {
    @prop()
    public goodplaceid!: string;

    @prop()
    public organization!: string;
}