
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
/**
 * @deprecated use passport instead of it
 */
@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false
        }
        const decoded = await this.validateToken(request.headers.authorization)
        if (decoded) {
            request.user = decoded
        }
        return true
    }
    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
        }
        const token = auth.split(' ')[1]
        try {
            const decoded = await jwt.verify(token, process.env.SECRET)
            return decoded
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN)
        }
    }
}
