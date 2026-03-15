import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { ProfilingService } from './profiling.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiling')
@UseGuards(JwtAuthGuard) // Protects these routes
export class ProfilingController {
  constructor(private readonly profilingService: ProfilingService) {}

  @Post()
  async create(@Req() req, @Body() body) {
    // req.user.userId comes from the JWT validated by AuthGuard
    return this.profilingService.createProfile(req.user.userId, body);
  }

  @Get('me')
  async getMyProfile(@Req() req) {
    return this.profilingService.getProfileByUserId(req.user.userId);
  }
}