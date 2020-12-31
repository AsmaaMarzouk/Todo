import {
  IsString,
  IsEmail
  ,MinLength
  ,MaxLength
} from 'class-validator';
import { IsUserAlreadyExist } from './IsUserAlreadyExist';
export  class UserCreate {

@MinLength(5, {
  message: "Last name is too short"
})
@MaxLength(50, {
  message: "Last name is too long"
})
  last_name: string;

@MinLength(5, {
  message: "First name is too short"
})
@MaxLength(50, {
  message: "First name is too long"
})
  first_name: string;
  
  @IsUserAlreadyExist({
    message: "User $value already exists. Choose another name."
 })
 @IsEmail()
  email: string;

  @IsString()
  @MinLength(10, {
    message: "Password is too short "
  })
  password: string;
}
