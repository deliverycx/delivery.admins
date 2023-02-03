import { Inject, Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from 'bcryptjs';
import {UsersRepository} from '../repository/users.repository'
import { RegisterAdminDTO, RegisterDTO } from "../dto/register.dto";

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

	async createOrganizationAdmin(body:RegisterAdminDTO) {
    const salt = await genSalt(10)
    const password = await hash(body.password, salt)
    return this.UsersRepository.create({...body,password})
    
  }
}