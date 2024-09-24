import { Injectable } from "@nestjs/common";
import { BotAxios } from "./bot.axios";

@Injectable()
export class BotServises {
	constructor(
		private readonly botAxios: BotAxios
	) { }

}