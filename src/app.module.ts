import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { RoleModule } from './role/role.module';
import { CommentModule } from './comment/comment.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [TypeOrmModule.forRoot(),
  GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    context: ({ req }) => ({ req }),
    debug: true,
    playground: true,
  }),
    UserModule, RoleModule, CommentModule, ItemModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }],
})
export class AppModule {

}
