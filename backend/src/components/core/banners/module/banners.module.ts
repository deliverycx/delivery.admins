import { Module } from "@nestjs/common";
import { DisplayBannerModule } from "./displayBanner.module";
import { GroopsModule } from "./groops.module";
import { MainBannerModule } from "./mainBanner.module";

@Module({
  imports: [
    MainBannerModule,
		GroopsModule,
		DisplayBannerModule
  ]
})
export class BannersModule{}