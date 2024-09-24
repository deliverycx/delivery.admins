import { Module } from "@nestjs/common";
import { BotServises } from "../servises/bot.servises";
import { BotCXController } from "../controllers/bot.controller";

@Module({
	imports: [
	],
	controllers: [BotCXController],
	providers: [BotServises]
})
export class BotModule { }