import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RegisterDTO{
  @ApiProperty()
  @IsString()
  name: string
  password:string
}