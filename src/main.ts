import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CrudConfigService } from '@nestjsx/crud';


const port = process.env.PORT || 3000

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    updateOneBase: {
      allowParamsOverride: true,
    },
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});
/**
 * So in order to apply global options you need load them in your main.ts (index.ts) file
 *  BEFORE you import AppModule class. 
 * That's because TypeScript decorators are executed when we declare our class 
 * but not when we create new class instance.
 * https://github.com/nestjsx/crud/wiki/Controllers#global-options
 */
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`server running on http://localhost:${port}`)
}
bootstrap();
