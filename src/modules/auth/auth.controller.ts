import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('register')
register(@Body() data: RegisterDto) {
  return this.authService.register(data);
}

@Post('login')
login(@Body() data: LoginDto) {
  return this.authService.login(data);
}
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return {
    message: "Profile fetched successfully",
    user: req.user
  };
}
}