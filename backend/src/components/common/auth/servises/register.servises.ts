import { Injectable } from "@nestjs/common";
import { genSalt, hash } from 'bcryptjs';
import { UsersRepository } from '../repository/users.repository';
import { RegisterAdminDTO, RegisterDTO } from "../dto/register.dto";

@Injectable()
export class RegisterServises {
  constructor(
      private readonly UsersRepository: UsersRepository
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async createAdmin(body: RegisterDTO) {
    const hashedPassword = await this.hashPassword(body.password);
    return this.UsersRepository.create({ ...body, password: hashedPassword });
  }

  async createOrganizationAdmin(body: RegisterAdminDTO) {
    const hashedPassword = await this.hashPassword(body.password);
    return this.UsersRepository.createAdmins({ ...body, password: hashedPassword });
  }
}
