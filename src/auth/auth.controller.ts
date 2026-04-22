import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService, AuthUser } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/login
  // @Public() vì đây là route đăng nhập, không cần JWT
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ExpressRequest & { user: AuthUser }): {
    access_token: string;
  } {
    // req.user được LocalStrategy gán sau khi validateUser thành công
    return this.authService.login(req.user);
  }


  @get('long')
  login(@Request() req: ExpressRequest & { user: AuthUser }): {
    access_token: string;
  } {
    // req.user được LocalStrategy gán sau khi validateUser thành công
    return this.authService.login(req.user);
  }
}
