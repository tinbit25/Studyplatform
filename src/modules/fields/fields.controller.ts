import { 
  Controller, Post, Get, Body, Param, 
  UseGuards, Request, BadRequestException 
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post() 
  async create(@Body() body: { name: string, description: string }) {
    return this.fieldsService.createField(body);
  }

  @Get()
  async findAll() {
    return this.fieldsService.getAllFields();
  }
  

@Get(':fieldId')
async getFieldDetails(@Param('fieldId') fieldId: string) {
  return this.fieldsService.findOne(fieldId);
}
@Post('select')
@UseGuards(JwtAuthGuard)

async selectField(@Request() req: any, @Body('fieldId') fieldId: string) { 
  if (!fieldId) throw new BadRequestException('fieldId is required');
  return this.fieldsService.selectField(req.user.userId, fieldId);
}
}