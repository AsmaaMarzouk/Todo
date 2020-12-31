import { InjectRepository } from "@nestjs/typeorm";
import {registerDecorator, ValidationOptions, ValidatorConstraint, 
    ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ) {}

    validate(email: any, args: ValidationArguments) {
        return this.userRepository.findOne(email).then(user => {
            if (user) return false;
            return true;
        });
    }

}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint
        });
   };
}