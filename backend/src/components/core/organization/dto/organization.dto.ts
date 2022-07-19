import { isBoolean, IsOptional, IsString } from 'class-validator';

export default class OrganizationDTO {

  @IsString()
  idorganization: string

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