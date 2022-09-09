import { isArray, isObject, IsOptional, IsString } from "class-validator"
import { ObjectId } from 'mongoose';

export class GroopsDto{
	
	@IsString()
	name:string
	category:string

	id:UniqueId

	banners:ObjectId

}