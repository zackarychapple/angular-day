import {IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  roles: Array<string>;
}