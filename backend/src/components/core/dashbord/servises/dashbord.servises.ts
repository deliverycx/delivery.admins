import { Inject } from "@nestjs/common";
import { BaseServises } from "src/services/base.services";
import { NewsRepository } from "../../news/repository/news.repository";
import { DashbordRepository } from "../repository/dashbord.repository";
import axios from "axios";

export class DashbordServises extends BaseServises{
	constructor(
		@Inject(DashbordRepository)
		private readonly Repository:DashbordRepository
	) {
		super(Repository);
	}

	setVipGuest({_id,guestvip}){
		return this.Repository.setVipGuestMetod(_id,guestvip)
	}
	
	async getActiveTerminals(organization:string){
		const { data: ikkotoken } = await axios.post(
			'https://api-ru.iiko.services/api/1/access_token',
			{
				apiLogin: process.env.TRANSFER_PASSWORD
			}
		);
		const token = ikkotoken.token
		const { data: ikkoterminal } = await axios.post(
			'https://api-ru.iiko.services/api/1/terminal_groups',
			{
				organizationIds: [
					organization
				],
				includeDisabled: true
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		const terminal = ikkoterminal.terminalGroups[0].items[0].id
		const { data: ikkoterminalstatus } = await axios.post(
			'https://api-ru.iiko.services/api/1/terminal_groups/is_alive',
			{
				"organizationIds": [
					organization
				],
				"terminalGroupIds": [
					terminal
				]
			},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		console.log(ikkoterminalstatus);	
	}
}