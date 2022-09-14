import { isArray, isObject, IsOptional, IsString } from "class-validator"
import { ObjectId } from 'mongoose';

export class DisplayBannerDto{

	@IsString()
	organization:ObjectId
	id:UniqueId
	field:string
	banner:string
}