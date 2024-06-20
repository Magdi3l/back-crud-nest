import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService = app.get(ConfigService);
  const port = configService.get<number>(SERVER_PORT) || 5000;
  await app.listen(port);
  console.log(`listening on port ${await app.getUrl()}`)
  
 
  
}
bootstrap();
