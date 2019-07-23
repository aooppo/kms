import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.stratgy';

@Module({
  imports: [forwardRef(() => UserModule), PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn },
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
