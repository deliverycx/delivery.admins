import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { OrganizationStatusClass } from "src/database/mongodbModel/delivery/organizationStatus.model";


@Injectable()
export class OrganizationStatusRepository{
  constructor(
    @InjectModel(OrganizationStatusClass) private readonly Model: ReturnModelType<typeof OrganizationStatusClass>,
  ) {}


}