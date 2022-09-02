import { isArray, isObject, IsOptional, IsString } from "class-validator"
import { ObjectId } from 'mongoose';

export class DisplayBannerDto{
	
	@IsString()
	name:string
	category:string

	id:UniqueId

	groop:ObjectId[]

}