import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard) // Protect this route
  async submitDiagnostic(@Req() req, @Body() body: any) {
    const userId = req.user.userId;
    return this.assessmentService.processDiagnostic(userId, body);
  }
}