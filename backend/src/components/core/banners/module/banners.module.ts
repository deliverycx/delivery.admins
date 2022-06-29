import { Module } from "@nestjs/common";
import { MainBannerModule } from "./mainBanner.module";

@Module({
  imports: [
    MainBannerModule
  ]
})
export class BannersModule{}