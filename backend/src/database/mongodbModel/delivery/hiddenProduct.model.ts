import {
    ModelOptions,
    prop,
} from "@typegoose/typegoose";

@ModelOptions({
    schemaOptions: { collection: 'hiddenProduct'}
})

export class OrganizationHiddenProduct {
    @prop({ type: String })
    public organization!: string

    @prop({ type: () => Array, default: [] })
    public hiddenProduct!: string[]
}