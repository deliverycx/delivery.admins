import { isBoolean, IsOptional, IsString } from 'class-validator';

export default class OrganizationStatusDTO {

  @IsString()
  organization: string

  @IsOptional()
  @IsString()
  phone: string
  

}