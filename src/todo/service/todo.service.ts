import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todo.entity';

@Injectable()
export class TodoService {
    constructor(
    @InjectRepository(Todo)
    private readonly todoRepository:Repository<Todo>
    ){}
//Get all data from database
findAll()
{
    try{
        return this.todoRepository.find();
        console.log("The all data");


    }
    catch(error) {
        console.log('That did not go well.')
        throw error
      }   
   
}
//Add new data to list
 create(todo:Todo)
{
    try{
        return this.todoRepository.save(todo);
        console.log(todo);
    }
    catch(error) {
        console.log('That did not go well.')
        throw error
      }
   
}
//update in list
update(id:number,content:string)
{
    try{
        return this.todoRepository.update(id, { content: content});
        console.log("updated to:",{ id });
    }
    catch(error) {
        console.log('That did not go well.')
        throw error
      }

}
//Get one by id
findOne(id:number)
{
    try{
        return this.todoRepository.findOne(id);
        console.log("Get one by id");
    }
  
    catch(error) {
        console.log('That did not go well.')
        throw error
      }
}
//delete from list 
remove(id:number)
{
    try{
        return this.todoRepository.delete(id);
        console.log("Deleted",id);
    }
    catch(error) {
        console.log('That did not go well.')
        throw error
      }
}
}