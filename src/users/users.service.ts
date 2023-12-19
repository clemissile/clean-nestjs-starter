import { Injectable } from '@nestjs/common';
import { IUser } from './users.interface';
import { UserModel } from 'src/dtos/user.dto';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      firstname: 'John',
      lastname: 'Doe',
      password: '123456',
    },
    {
      id: 2,
      email: 'paul.bismuth@example.com',
      firstname: 'Paul',
      lastname: 'Bismuth',
      password: 'changeme',
    },
  ];

  async findOne(email: string): Promise<UserModel | undefined> {
    const user = this.users.find(user => user.email === email);
    let { password, ...u } = user;
    return u;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    console.log(
      `[UsersService] validateUser, email: ${email}, password: ${password}`,
    );
    const user = this.users.find(
      user => user.email === email && user.password === password,
    );
    if (user) {
      console.log('[UsersService] validateUser: found user', user);
      return { ...user, password: undefined };
    }
    return undefined;
  }
}
