import { AuthService, LoginResponse } from "./auth.service";
import { Post, Get, Controller, HttpCode, HttpStatus, Request, Body, UseGuards } from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDTO: LoginDTO):Promise<LoginResponse>{
        return this.authService.login(loginDTO)
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req){
        return {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            createdAt: req.user.createdAt,
            isActive: req.user.isActive
        }
    }

    @Get('verify')
    @UseGuards(JwtAuthGuard)
    async verifyToken(@Request() req){
        return {
            valid: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
                role: req.user.role
            }
        }
    }

}