import { IsString } from "class-validator";

export class organizationTablesDTO{
	@IsString()
  idorganization: string
	organization: string
	id:string
	
}