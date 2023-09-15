import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { OrganizationfilterModel } from "src/database/mongodbModel/delivery/organizationFilter";

import { BaseRepository } from "src/domain/repository/base.repository";

@Injectable()
export class OrganizationFilterRepository extends BaseRepository<OrganizationfilterModel>{
  constructor(
    @InjectModel(OrganizationfilterModel) private readonly Model: ReturnModelType<typeof OrganizationfilterModel>,
  ) { 
		super(Model)
	}
}