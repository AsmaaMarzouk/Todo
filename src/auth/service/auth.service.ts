import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../../users/service/users.service';
var fs = require('fs');

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }
 
  



  async createToken(email: string) {
    const expiresIn = 60;
    const secretOrKey = fs.readFileSync("src/auth/constants/key.pem");;
    const user = { email };
    
     const token = jwt.sign(user, secretOrKey,   { audience: 'urn:foo' });
    return { expires_in: expiresIn, token };
  }
  async validateUser(signedUser): Promise<boolean> {
    if (signedUser && signedUser.email) {
      return Boolean(this.usersService.getUserByEmail(signedUser.email));
    }

    return false;
  }
}
