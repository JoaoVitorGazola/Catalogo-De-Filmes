import { Controller, Post, UseGuards, Request, Response, Get, HttpStatus, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
    
    @Post('register')
    async register(@Body('user') user: User) {
      return this.authService.register(user);
    }
  
  @UseGuards(JwtAuthGuard)
  @Get('validateToken')
  public async validateToken(@Response() res) {
    return res.status(HttpStatus.OK).json('OK')
  }
}
