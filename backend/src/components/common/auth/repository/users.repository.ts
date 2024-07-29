import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { IUsersEntities, usersEntities } from "../../../../domain/entities/users.entities";
import { BaseRepository } from "src/domain/repository/base.repository";


@Injectable()
export class UsersRepository extends BaseRepository<AdminUsersModel> {
	constructor(
		@InjectModel(AdminUsersModel) private readonly userModel: ReturnModelType<typeof AdminUsersModel>,
	) {
		super(userModel)
	}
	async createAdmins(entiti: IUsersEntities) {
		const newadmin = await this.userModel.create(entiti)
		return newadmin
	}
	async getOneAdmin(name: string) {
		return await this.userModel.findOne({ name }).exec();
	}
	async getOneAdminBuid(id: string) {
		return await this.userModel.findById(id).exec();
	}
	async getOneToken(body: { name: string, refreshToken: string }) {
		return await this.userModel.findOne(body).exec();
	}
	async updateUser(body: any) {
		return await this.userModel.findByIdAndUpdate(body._id, body)
	}

	async addPageUser(id: string, pages: []) {
		return await this.userModel.findByIdAndUpdate(id, {
			$set: {
				pagesUser: pages
			}
		})
	}

	async addOrganizationsUser(id: string, pages: []) {
		return await this.userModel.findByIdAndUpdate(id, {
			$set: {
				organizationsUser: pages
			}
		})
	}
}