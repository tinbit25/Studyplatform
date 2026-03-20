import { Controller, Post, Get, Body, UseGuards, Req, Request } from '@nestjs/common';
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
  @Get('my-exams')
@UseGuards(JwtAuthGuard)
async getMyExams(@Request() req) {
  return this.assessmentService.findMyExams(req.user.userId);
}
}