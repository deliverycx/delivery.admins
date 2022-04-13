import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { doc } from './docs/api.docs';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    }
  );
  app.enableCors({
    origin: [process.env.CLIENT_PATH],

    credentials: true
  });

  app.set("trust proxy", true);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  /*
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static', ///static/shop
  });
  */

  doc(app); 
  await app.listen(process.env.PORT);
}
bootstrap();
