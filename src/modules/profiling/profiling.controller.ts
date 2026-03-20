import { Controller,Request, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ProfilingService } from './profiling.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiling')
export class ProfilingController {
  constructor(private readonly profilingService: ProfilingService) {}

 @Post()
@UseGuards(JwtAuthGuard)
async handleProfile(@Request() req, @Body() body: any) {
  const userId = req.user.userId;
  // ⚡ CHANGE THIS: Call createOrUpdate instead of createProfile
  return this.profilingService.createOrUpdate(userId, body);
}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyFullProfile(@Req() req) {
    return this.profilingService.getFullUserData(req.user.userId);
  }
}