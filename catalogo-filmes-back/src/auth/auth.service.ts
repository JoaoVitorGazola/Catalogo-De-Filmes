import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) { }

    public async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user &&  (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    public async login(user: User) {
      const payload = { username: user.email, sub: user.id };
      return {
        id: user.id,
        email: user.email,
        access_token: this.jwtService.sign(payload),
      };
    }

    public async register(user: User) {
      return await this.usersService.newUser(user);
    }
}