import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/controller/todo.controller';
import { TodoModule } from './todo/module/todo.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { TodoService } from './todo/service/todo.service';
import {Repository} from 'typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/service/auth.service';
import { UsersModule } from './users/module/users.module';
import { UsersService } from './users/service/users.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { AuthModule } from './auth/module/auth.module';
import { AuthController } from './auth/controller/auth.controller';
import { UsersController } from './users/controller/users.controller';
import { LoggerMiddleware } from 'src/logger.middleware';
import { User } from './users/user.entity';
@Module({
  imports: [TypeOrmModule.forRoot(),TodoModule,Repository,PassportModule,UsersModule,AuthModule,TypeOrmModule.forFeature([User])],
  controllers: [AppController, TodoController,AuthController,UsersController],
  providers: [AppService,TodoService,UsersService,JwtStrategy,AuthService,],
})
export class AppModule {
 configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(LoggerMiddleware)
    .forRoutes({ path: '/todo', method: RequestMethod.ALL });
    
}
}
