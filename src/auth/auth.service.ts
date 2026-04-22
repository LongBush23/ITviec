import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Dùng cho LocalStrategy - xác thực email và password
  async validateUser(email: string, password: string): Promise<AuthUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { password: _pw, ...result } = user;
      void _pw;
      return result as unknown as AuthUser;
    }
    return null;
  }

  // Gọi sau khi validateUser thành công, trả về JWT
  login(user: AuthUser): { access_token: string } {
    const payload = { email: user.email, sub: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
