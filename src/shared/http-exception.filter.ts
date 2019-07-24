import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        if (!request) {
            console.log(ctx, response)
            // response.status(200).json({ msg: 'graphql error!' });
            return
        }
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR

        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request ? request.url : 'graphql-url!',
            method: request ? request.method : 'graphql-method!',
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception.message.error || exception.message || null
                    : 'Internal server error',
        };

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            Logger.error(
                `${request.method} ${request.url}`,
                exception.stack,
                'ExceptionFilter',
            );
        } else {
            Logger.error(
                `${request && request.method} ${request && request.url}`,
                JSON.stringify(errorResponse),
                'ExceptionFilter',
            );
        }

        response.status(status).json(errorResponse);
    }
}