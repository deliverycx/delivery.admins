import { isBoolean, IsOptional, IsString } from 'class-validator';

export default class OrganizationDTO {

	@IsOptional()
  @IsString()
  idorganization: string
	cityid:string


  @IsOptional()
  @IsString()
  delivmetod: string
  
  @IsOptional()
  public isHidden:boolean

	@IsOptional()
	social:[]

	@IsOptional()
	reservetable:boolean

}