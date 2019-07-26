import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {

    @Field()
    name: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    description: string;
}
