import { isBoolean, IsOptional, IsString } from 'class-validator';

export default class OrganizationSettingDTO {

  @IsString()
  idorganization: string

  @IsOptional()
  @IsString()
  phone: string
  

}