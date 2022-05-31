import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { Model, Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";
import { MainBannerModel } from "src/database/mongodbModel/admin/mainBanner.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class BannerRepository extends BaseRepository<MainBannerModel>{
	constructor(
    @InjectModel(MainBannerModel) private readonly BannerModel: ReturnModelType<typeof MainBannerModel>,
  ) {
		super(BannerModel)
	 }
}