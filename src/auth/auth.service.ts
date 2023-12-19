import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/dtos/auth.dto';
import { UserModel } from 'src/dtos/user.dto';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`,
    );
    return await this.usersService.validateUser(email, password);
  }

  async login(user: UserModel): Promise<AccessToken> {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`);
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
      currentUser: user,
    };
  }
}
