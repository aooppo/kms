import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { GqlLocalAuthGuard, GqlJwtAuthGuard } from "../auth/graphql-auth.guard";
import { UserDTO } from "./user.dto";
import { User } from "../shared/user.decorator";
import { UserEntity } from "./user.entity";
import { UserInput } from "./user.input";
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

    @Mutation(returns => String)
    async register(@Args('data') user: UserInput) {
        const u = await this.userService.add(user);
        return u.id;
    }

}
