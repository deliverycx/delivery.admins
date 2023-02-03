import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RegisterDTO{
  @ApiProperty()
  name: string
  password:string
}

export class RegisterAdminDTO{
  @ApiProperty()
  name: string
  password:string
	role:string
	organization:string
}