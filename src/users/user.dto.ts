import { ApiProperty } from '@nestjs/swagger';
export  class UserCreate {
@ApiProperty({ required: true, maxLength: 100 })
  last_name: string;
  @ApiProperty({ required: true, maxLength: 100 })
  first_name: string;
  @ApiProperty({ required: true, maxLength: 100 })
  email: string;
  @ApiProperty({ required: true, maxLength: 100 })
  password: string;
}
