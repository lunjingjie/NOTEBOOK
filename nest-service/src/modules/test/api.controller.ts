import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class ApiController {
  @Get('/hello')
  getHello(): string {
    return 'Hello World!';
  }
}
