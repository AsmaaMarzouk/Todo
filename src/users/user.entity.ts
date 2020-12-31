import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '../../node_modules/@nestjs/swagger';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column({ length: 500, nullable: false })
  last_name: string;

  @ApiProperty({ required: true, maxLength: 50 })
  @Column({ length: 500, nullable: false })
  first_name: string;

  @ApiProperty({ minLength:7 ,required: true })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ required: true, maxLength: 100 })
  @Column({ length: 500, nullable: false })
  password: string;

}