import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { DashbordModel } from "src/database/mongodbModel/admin/dashbord.model";
import { NewsModel } from "src/database/mongodbModel/admin/news.model";
import { BaseRepository } from "src/domain/repository/base.repository";

export class DashbordRepository extends BaseRepository<NewsModel>{
	constructor(
    @InjectModel(DashbordModel) private readonly Model: ReturnModelType<typeof DashbordModel>,
  ) {
		super(Model)
	 }

	 setVipGuestMetod(id:string,metod:boolean){
			if(id){
				return this.Model.findByIdAndUpdate(
					{
						_id:id,
					},
					{
						$set:{
							guestvip:metod
						}
					}

				) 
			}else{
				return this.Model.create(
					{
						guestvip:metod
					}

				)
			}
			
	 }
}