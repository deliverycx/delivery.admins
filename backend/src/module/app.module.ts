import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from "@nestjs/mongoose";
import * as path from "path";
import * as fs from "fs";
import { AuthModule } from 'src/components/common/auth/module/auth.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { UnloadModule } from 'src/components/core/unload/module/unload.module';
import { ADMIN_DB, DELIVERY_DB } from 'src/database/mongodbModel/config.mongodb';
import { OrganizationModule } from 'src/components/core/organization/module/organization.module';

process.chdir(`${__dirname}/../..`);
console.log('dr',process.chdir(`${__dirname}/../..`))

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
    AuthModule,
    UnloadModule,
    OrganizationModule
  ],
  
})
export class AppModule {}
