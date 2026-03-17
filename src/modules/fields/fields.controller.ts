import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post() // This is the missing piece that handles the POST request
  async create(@Body() body: { name: string, description: string }) {
    return this.fieldsService.createField(body);
  }

  @Get()
  async findAll() {
    return this.fieldsService.getAllFields();
  }
}