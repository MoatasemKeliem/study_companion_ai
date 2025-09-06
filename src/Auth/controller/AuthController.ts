import { Body, Controller, Get, Post, Req, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from '../Service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDTO } from 'src/DTO/RegisterDTO';
import { UserRole } from 'src/entities/user.entity';
import { Roles, RolesGuard } from 'src/Strategy/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) { }


    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Request() req, @Response() res: Response) {
        return await this.authService.login(req.user, res)
    }

    @Get('profile')
    getProfile(@Req() req) {
        const token = req.cookies['access_token'];
        const decoded = this.jwtService.verify(token);
        return decoded;
    }

    @Post("logout")
    logout(@Response() res: ExpressResponse) {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.send({ message: "Logged out" });
    }

    @Post("/register")
    async register(@Body() registerBody: RegisterDTO) {
        return await this.authService.register(registerBody);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get("/test")
    @Roles(UserRole.ADMIN)
    async test() {
        return "Can you see ADMIN";
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get("/userTest")
    @Roles(UserRole.USER)
    async testUser() {
        return "Can you see USER";
    }

}
