import { ObjectType, Field, InterfaceType } from "type-graphql";

@InterfaceType()
export class ST {

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    @Field()
    accessToken: string;
}
