import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CounterHinkalModel } from "src/database/mongodbModel/admin/counterHi.model";
import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class OrganizationCounterRepository extends BaseRepository<CounterHinkalModel>{
	constructor(
		@InjectModel(CounterHinkalModel) private readonly Model: ReturnModelType<typeof CounterHinkalModel>,
	) {
		super(Model)
	}
}