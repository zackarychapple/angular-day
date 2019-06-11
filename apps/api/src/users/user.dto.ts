import {IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {Exclude} from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  roles: Array<string>;

  @IsNotEmpty()
  @ApiModelProperty()
  @Exclude()
  password: string;
}
