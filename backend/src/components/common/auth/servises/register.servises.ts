import { Inject, Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from 'bcryptjs';
import RegisterDTO from './../dto/register.dto';
import {UsersRepository} from '../../../../domain/repository/users.repository'

@Injectable()
export class RegisterServises{
  constructor(
    private readonly UsersRepository: UsersRepository
  ){}

  async createAdmin(body:RegisterDTO) {
    const salt = await genSalt(10)
    const password = await hash(body.password, salt)
    return this.UsersRepository.create({...body,password})
    
  }
}