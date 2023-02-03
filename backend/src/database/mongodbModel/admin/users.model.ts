import { buildSchema, getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { IUsersEntities } from "src/domain/entities/users.entities";

@modelOptions({ schemaOptions: { collection: 'users' } })
export class AdminUsersModel implements IUsersEntities{
  @prop({ type: () => String })
  public name: string
  
  @prop({ type: () => String })
  public password:string

	@prop({ type: () => String })
  public role:string

	@prop({ type: () => String })
  public organization:string

}

//export const RegisterSchema = buildSchema(RegisterClass);
//export const RegisterModel = getModelForClass(RegisterClass);
