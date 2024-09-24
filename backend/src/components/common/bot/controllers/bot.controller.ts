import { Controller } from "@nestjs/common";
import { BotServises } from "../servises/bot.servises";

@Controller("botcx")
export class BotCXController {
	constructor(
		private readonly botServises: BotServises
	) { }
}