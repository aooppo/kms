import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { GqlLocalAuthGuard, GqlJwtAuthGuard } from "../auth/graphql-auth.guard";
import { UserDTO } from "./user.dto";
import { User } from "../shared/user.decorator";
import { UserEntity } from "./user.entity";
import { ST } from "./string.type";
import { InputType } from "type-graphql";


@Resolver(UserEntity)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @UseGuards(GqlJwtAuthGuard)
    @Query(returns => [UserEntity])
    async users() {
        return this.userService.findAll()
    }


    // @Mutation()
    // async login(@User() use) {
    //     console.log(`login`, user)
    // }



    @Mutation(returns => String)
    async register(@Args('username') username: string, @Args('password') password: string) {
        const aa: ST = { accessToken: '111' };
        // const user = await this.userService.add({ name: username, password })
        return `ashs token A`;
    }

}

