import { Controller , Post, HttpStatus, HttpCode, Get, Response, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import { User } from '../../users/user.entity';
import { UserCreate } from '../../users/user.dto';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: UserCreate):Promise<void> {
    try{
      await this.userService.create(body);
      console.log(body);
 }
    catch(error) {
      console.log('That did not go well.')
      throw error
}
    }



    

    @Post('login')
    async loginUser(@Response() res: any, @Body() body: UserCreate) {
      if (!(body && body.email && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' });
      }
  
      const user = await this.userService.getUserByEmail(body.email);
  
      if (user) {
        if (await this.userService.compareHash(body.password, user.password)) {
          return res.status(HttpStatus.OK).json(await this.authService.createToken(user.email));
        }
      }
  
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email or password wrong!' });
    } 

}
