import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ProfilingService } from './profiling.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiling')
export class ProfilingController {
  constructor(private readonly profilingService: ProfilingService) {}

  @Post()
@UseGuards(JwtAuthGuard)
async create(@Req() req, @Body() body: any) {
  // Calling the service method we just verified
  return this.profilingService.createProfile(req.user.userId, body); 
}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyFullProfile(@Req() req) {
    return this.profilingService.getFullUserData(req.user.userId);
  }
}