import { Request as ExpressRequest } from 'express';
import { AuthService, AuthUser } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: ExpressRequest & {
        user: AuthUser;
    }): {
        access_token: string;
    };
}
