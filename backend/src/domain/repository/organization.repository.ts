import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { CityClass } from "src/database/mongodbModel/delivery/city.model";
import { OrganizationClass } from "src/database/mongodbModel/delivery/organization.model";
import { organizationEntities } from "../entities/organization.entities";

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel(OrganizationClass) private readonly organizationModel: ReturnModelType<typeof OrganizationClass>,
    @InjectModel(CityClass) private readonly cityModel: ReturnModelType<typeof CityClass>
  ) { }

  async getAllOrganization() {
    const result = await this.cityModel
            .find({})
            .populate("organizations")
            .lean();

        return result
  }
  async swtchDelivMetod(orgid:string,metod:string) {
    const result = await this.organizationModel.findOneAndUpdate(
      {
        id: orgid
      },
      {
        $set: {
          delivMetod: metod
        }
      },
      { new: true }
    )
    return organizationEntities.delivMetod(result.id,result.delivMetod)
  }
}