import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { OrganizationCountServises } from "../servises/organizationCounter.servises";
import OrganizationCountDTO from "../dto/organizationCounter.dto";
import * as sanitize from 'sanitize-html'
import { SqlInjectionGuard, XmlGuard } from "src/guard/xxe.guard";
import { Response } from 'express';
import axios from "axios";

@Controller('counterhinkal')
@UseGuards(SqlInjectionGuard, XmlGuard)
export class organizationCounterControllers {
	constructor(
		private readonly servises: OrganizationCountServises
	) { }

	@Post('setcount')
	setCoutn(@Body() body: OrganizationCountDTO) {

		const cleanId = sanitize(body._id)

		console.log('cleanId', cleanId);
		return !cleanId ? this.servises.create(body) : this.servises.edit(body, body._id)
	}

	@Get('buorg')
	getCount(@Query() query: { organization: string }) {
		return this.servises.getOne(query)
	}

	@Post('checkcount')
	async check(
		@Body() body: { url: string, date: any },
		@Res() response: Response,
	) {
		try {

			const { data } = await axios.get(`https://${body.url}:443/resto/api/auth?login=olap_v2&pass=d5cfba00422fccc08b744bc419f7e450a8e67f6a`)

			const { data: hi } = await axios.get(`https://${body.url}:443/resto/api/v2/reports/olap/byPresetId/6ba2e871-8d2b-413b-97cf-d7373dbb0a02?key=${data}&dateFrom=${String(body.date.dateFrom)}&dateTo=${String(body.date.dateTo)}`)

			const dash = hi && hi.data[0]

			const count = Math.trunc(dash.DishAmountInt)
			response.status(200).json(count);
		} catch (error) {

			response.status(400).json(null);
		}
	}
}