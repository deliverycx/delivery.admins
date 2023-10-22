import { isBoolean, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export default class OrganizationHiddenProductDto {
    @IsString()
    id:string

    isActive:boolean
    token:string
    merchantId:string
    organization:ObjectId
    productId: string
}