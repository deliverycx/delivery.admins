import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from "@nestjs/mongoose";
import * as path from "path";
import * as fs from "fs";
import { AuthModule } from 'src/components/common/auth/module/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UnloadModule } from 'src/components/core/unload/module/unload.module';
import { ADMIN_DB, DELIVERY_DB } from 'src/database/mongodbModel/config.mongodb';
import { BannersModule } from 'src/components/core/banners/module/banners.module';
import { MulterModule } from '@nestjs/platform-express';
import { NewsModule } from 'src/components/core/news/module/news.module';
import { StocksModule } from 'src/components/core/stocks/module/stocks.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OrganizationModule } from 'src/components/core/organization/module/organization.module';
import { OrderModule } from 'src/components/core/orders/module/order.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(
          __dirname,
          `../../.${process.env.NODE_ENV}.env`
      )
    }),
    MongooseModule.forRoot(process.env.CONNECTION_1,
      {
        connectionName: ADMIN_DB
      }),
    MongooseModule.forRoot(process.env.CONNECTION_2,
      {
        connectionName: DELIVERY_DB
      }),
			MulterModule.register({
				dest: './public/static/shop',
			}),
		NestjsFormDataModule,	
    AuthModule,
    UnloadModule,
    OrganizationModule,
		BannersModule,
		NewsModule,
		StocksModule,
		OrderModule
  ],
  
})
export class AppModule {}
