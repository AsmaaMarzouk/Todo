import { Body, Controller, Get, Post, Put, Delete, Param, Res ,Header, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '../todo.entity';
@Controller('todo')

export class TodoController {
  
    constructor(private readonly todoService:TodoService){}


    @Get()
    async findAll():Promise<Todo[]>
    {
        try{
           
           return this.todoService.findAll();
           console.log("All data");
        }

        catch(error) {
            console.log('That did not go well.')
            throw error
          }
    }
    //Get one by id
    @Get(':id')
    findOne(@Param('id', new ParseIntPipe())
    id: number):Promise<Todo>
     {
        try
        {
           return this.todoService.findOne(id);
            console.log("Get one by id");
        }
        catch(error) {
            console.log('That did not go well.')
            throw error
          }
    }
    @Post()
    async create(@Body() body ):Promise<void>
    {
        try{
            await this.todoService.create(body);
            console.log(body);

        }
      catch(error) {
        console.log('That did not go Goood.')
        throw error
      }
    }
    @Put(':id')
    async update(@Param('id') id,@Body('content') content)
    {
        try{
            return this.todoService.update(id,content);
            console.log("updated to: ",id);
        }
      
        catch(error) {
            console.log('That did not go well.')
            throw error
          }
    }
    @Delete(':id')
    async remove(@Param('id') id)
    {
        try{
         return this.todoService.remove(id);
        console.log("Deleted : ",id);
        }
      
        catch(error) {
            console.log('That did not go well.')
            throw error
          }
    }
}
