import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { GqlLocalAuthGuard, GqlJwtAuthGuard } from "../auth/graphql-auth.guard";
import { UserDTO } from "./user.dto";
import { User } from "../shared/user.decorator";

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @UseGuards(GqlJwtAuthGuard)
    @Query()
    async users() {
        return this.userService.findAll()
    }


    // @Mutation()
    // async login(@User() use) {
    //     console.log(`login`, user)
    // }

    @Mutation()
    async register(@Args() { username, password }) {
        console.log(`register..`)
        const user = await this.userService.add({ name: username, password })
        return { accessToken: '123' }
    }

}