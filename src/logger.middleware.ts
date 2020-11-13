import {
    Injectable,
    NestMiddleware,
    HttpException,
    HttpStatus,
    
  } from '@nestjs/common';
  import * as jwt from 'jsonwebtoken';
  import { UsersService } from './users/service/users.service';
  import { jwtConstants } from './auth/constants/constants';

  @Injectable()
  export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
  
  public resolve() {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        console.log('token : ', req.headers.authorization);
        const token = req.headers.authorization;
        const decoded=null;
        try {
        const decoded: any = jwt.verify(token, jwtConstants.secret);
       } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
          },
          403,
        );
       }
       
        if (decoded) {
          console.log('decoded :', decoded);
          if (decoded.email) {
            const user = await this.usersService.getUserByEmail(decoded.email);
            if (user) {
              console.log('user', user);
              next();
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'This is a custom message',
                },
                403,
              );
            }
          } else {
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
              },
              403,
            );
          }
        } else {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'This is a custom message',
            },
            403,
          );
        }
      }else{
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
          },
          403,
        );
      }
    };
  }
}
