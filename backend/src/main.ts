import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { doc } from './docs/api.docs';
import { AppModule } from './module/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    }
  );


	const allowedRequestedFromHosts = process.env.CLIENT_PATH.split(" ");
	
	//app.setGlobalPrefix('admin');
	
	/*
  app.enableCors({
    origin: allowedRequestedFromHosts,

    credentials: true
  });
	*/
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

  app.set("trust proxy", true);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  /*
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static', ///static/shop
  });
  */
  app.use(cookieParser());
  

  doc(app); 
  await app.listen(process.env.PORT);
}
bootstrap();
