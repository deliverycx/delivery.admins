import { IsString } from 'class-validator';

export default class OrganizationDTO {

  @IsString()
  idorganization: string
  delivmetod:string
}