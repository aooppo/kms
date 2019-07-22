import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';

/**
 * only import useful module for use, no need service. entity and module should be import at same time
 */
@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity]), UserModule],
  controllers: [RoleController],
  providers: [RoleService]

})
export class RoleModule { }
