import { Controller ,Get, Post,Body} from '@nestjs/common';
import {UsersService } from '../service/users.service';
import {UserCreate} from '../user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    findAllUser() {
      return (
        this.usersService
          .findAll()
          .then(data => data)
          // tslint:disable-next-line:no-console
          .catch(error => console.error(JSON.stringify(error)))
      );
    }
    @Post('/create')
    async create(@Body() user :UserCreate){
        this.usersService.create(user);
       
    }
}
