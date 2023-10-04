import { isBoolean, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export default class OrganizationGoodPlaceDTO {

    @IsString()
    id:string

    isActive:boolean
    token:string
    merchantId:string
    organization:ObjectId


}