
import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    if (typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError) {
      const status = rpcError.status;
      return response.status(status).json(rpcError);
    }
    // console.error(rpcError);

    response.status(400).json({
      statusCode: 400,
      message: rpcError,
    });
  }
}
