import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import type { IUser } from '../users/users.interface';

interface RequestWithUser extends ExpressRequest {
  user: IUser;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('refresh')
  refresh(
    @Body('userId') userId: string,
    @Body('refresh_token') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req: RequestWithUser) {
    await this.authService.logout(req.user._id);
    return { message: 'Logout successful' };
  }
}
