import { isBoolean, IsOptional, IsString } from 'class-validator';

export default class OrganizationDTO {

	@IsOptional()
  @IsString()
	id:string
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

	@IsOptional()
	worktime:string[]
}

export class CityDTO{
	@IsString()
	name:string
}