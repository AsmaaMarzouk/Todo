import { Module } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controller/todo.controller';
import { Todo } from '../todo.entity';
@Module({
  imports : [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers : [TodoController],
  exports : [TypeOrmModule]

})
export class TodoModule {}
