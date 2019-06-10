import {IsNotEmpty} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiModelProperty()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  password: string;
}
