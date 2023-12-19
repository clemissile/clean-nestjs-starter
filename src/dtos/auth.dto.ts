import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserModel } from './user.dto';

export class LoginDto {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class AccessToken {
  @IsString()
  @ApiProperty()
  token: string;

  @ApiProperty()
  currentUser: UserModel;
}
