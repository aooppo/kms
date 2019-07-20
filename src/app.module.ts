import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
// import { Connection } from 'typeorm';


@Module({
  imports: [ TypeOrmModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService,   {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  }],
})
export class AppModule {
  
}
