import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AdminUsersModel } from "src/database/mongodbModel/admin/users.model";
import { IUsersEntities, usersEntities } from "../entities/users.entities";


@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(AdminUsersModel) private readonly userModel: ReturnModelType<typeof AdminUsersModel>,
  ) {}
  async create(entiti:IUsersEntities) {
    const newadmin = await this.userModel.create(entiti)
    return usersEntities.mapper(newadmin)
  }
  async getOne(name:string) {
    return await this.userModel.findOne({ name }).exec();
  }
}