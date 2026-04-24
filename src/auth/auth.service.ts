import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

export interface AuthUser {
  _id: string;
  email: string;
  name: string;
  role?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Dùng cho LocalStrategy - xác thực email và password
  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    const { password: _pw, ...result } = user;
    void _pw;
    return result as unknown as AuthUser;
  }

  // Tạo access_token và refresh_token, lưu hashed refresh_token vào DB
  async login(user: AuthUser): Promise<LoginResponse> {
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.name,
      role: user.role,
    };

    const accessSecret = this.configService.get<string>('JWT_SECRET');
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const accessExpire =
      this.configService.get<string>('JWT_ACCESS_EXPIRE') ?? '1d';
    const refreshExpire =
      this.configService.get<string>('JWT_REFRESH_EXPIRE') ?? '7d';

    const access_token = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: accessExpire as any,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpire as any,
    });

    // Lưu hashed refresh_token vào DB
    await this.usersService.updateRefreshToken(user._id, refresh_token);

    return {
      access_token,
      refresh_token,
      user,
    };
  }

  // Làm mới access_token từ refresh_token hợp lệ
  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    // Verify chữ ký JWT của refresh token
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, { secret: refreshSecret });
    } catch {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    // So sánh với hashed refresh_token trong DB
    const isValid = await this.usersService.validateRefreshToken(
      userId,
      refreshToken,
    );
    if (!isValid) {
      throw new UnauthorizedException('Refresh token không khớp');
    }

    const accessSecret = this.configService.get<string>('JWT_SECRET');
    const accessExpire =
      this.configService.get<string>('JWT_ACCESS_EXPIRE') ?? '1d';
    const newPayload = {
      email: payload.email,
      sub: payload.sub,
      name: payload.name,
    };

    return {
      access_token: this.jwtService.sign(newPayload, {
        secret: accessSecret,
        expiresIn: accessExpire as any,
      }),
    };
  }

  // Xoá refresh_token khỏi DB (đăng xuất)
  async logout(userId: string): Promise<void> {
    await this.usersService.updateRefreshToken(userId, null);
  }
}
