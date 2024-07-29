import { Inject, Injectable } from "@nestjs/common";
import { genSalt, hash, compare, compareSync } from 'bcryptjs';
import { UsersRepository } from '../repository/users.repository'
import { RegisterAdminDTO, RegisterDTO } from "../dto/register.dto";

@Injectable()
export class RegisterServises {
	constructor(
		private readonly UsersRepository: UsersRepository
	) { }

	async createAdmin(body: RegisterDTO) {
		const salt = await genSalt(10)
		const password = await hash(body.password, salt)
		return this.UsersRepository.create({ ...body, password })

	}

	async createOrganizationAdmin(body: RegisterAdminDTO) {
		const salt = await genSalt(10)
		const password = await hash(body.password, salt)
		return this.UsersRepository.createAdmins({ ...body, password })

	}

	async updateUser(body: RegisterAdminDTO) {
		const salt = await genSalt(10)

		if (body.password.length < 10) {
			const password = await hash(body.password, salt)
			return this.UsersRepository.updateUser({ ...body, password })

		} else {
			delete body.password
			return this.UsersRepository.updateUser(body)
		}

	}

	async addPagesUserMetod(body: any) {
		return this.UsersRepository.addPageUser(body.id, body.pages)
	}

	async addOrganizationsUserMetod(body: any) {
		return this.UsersRepository.addOrganizationsUser(body.id, body.points)
	}
}