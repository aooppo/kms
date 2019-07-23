import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRO } from '../user/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async validateUser(username: string, pass: string): Promise<UserRO | null> {
        const user = await this.userService.getByName(username);
        if (user && await user.comparePassword(pass)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
