import { IsPhoneNumber, IsObject, IsMongoId, IsEmail, IsNumber, IsString, IsNotEmpty } from "class-validator";
import { IsMongoIdObject } from "src/services/mongoIdValidate.decorator";


export default class OrganizationCountDTO {

	@IsMongoId({ message: 'Invalid ObjectId format' })
	@IsString()
	@IsNotEmpty()
	public _id: string

	@IsNumber()
	public coutn: number

	@IsString()
	public organization: string
	public date: string
}