import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('hello')
  async getHello() {
    return 'Hello World!';
  }
}
