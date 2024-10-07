import { IsPhoneNumber, IsObject, IsMongoId, IsEmail, IsNumber, IsString } from "class-validator";
import { IsMongoIdObject } from "src/services/mongoIdValidate.decorator";


export default class OrganizationCountDTO {

	@IsMongoIdObject()
	@IsMongoId({ message: 'Invalid ObjectId format' })
	public _id: string

	@IsNumber()
	public coutn: number

	@IsString()
	public organization: string
	public date: string
}