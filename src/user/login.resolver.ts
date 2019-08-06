import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(UserEntity)
export class LoginResolver {
    constructor(
        private userService: UserService,
        private authService: AuthService) { }

    @Mutation(returns => String)
    async login(@Args('username') name: string, @Args('password') password: string) {
        const user = await this.userService.getByName(name);
        if (user && await user.comparePassword(password)) {
            const obj = await this.authService.login({ username: user.name, userId: user.id });
            return obj.access_token;
        }
        throw new UnauthorizedException();
    }
}
