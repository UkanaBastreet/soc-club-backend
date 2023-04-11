import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { AppService, fbt } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Patch()
  getAllFeedbacks(): fbt[] {
    return this.appService.getAll();
  }
  @Post()
  addFeedback(@Body() fb: fbt): fbt[] {
    return this.appService.create(fb);
  }
  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    console.log(id);
    return this.appService.remove(+id);
  }
}
