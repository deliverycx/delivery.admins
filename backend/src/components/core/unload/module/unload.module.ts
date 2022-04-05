import { Module } from "@nestjs/common";
import { UnloadControllers } from "../controllers/unload.controller";

@Module({
  controllers: [UnloadControllers], 
})
export class UnloadModule {}