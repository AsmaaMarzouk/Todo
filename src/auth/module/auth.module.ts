import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersModule } from '../../users/module/users.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { AuthController } from '../controller/auth.controller';
import {TodoModule} from '../../todo/module/todo.module';
import { TodoController } from '../../todo/controller/todo.controller';
import { UsersService } from '../../users/service/users.service';
import { User } from '../../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from '../../todo/service/todo.service';
@Module({
  imports: [UsersModule , TodoModule,TypeOrmModule.forFeature([User])],
  providers: [AuthService , JwtStrategy,UsersService,TodoService],
  controllers: [AuthController,TodoController]
})
export class AuthModule {}
