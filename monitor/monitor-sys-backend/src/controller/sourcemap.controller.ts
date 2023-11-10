import { Controller, Post, Inject, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import path = require('path');
import fs = require('fs');

@Controller('/sourcemap')
export class SourcemapController {
  @Inject()
  ctx: Context;

  @Post('/upload')
  async upload(@Body('name') name) {
    const stream = this.ctx.req;
    const filename = name;
    const dir = path.join('', 'uploads');
    console.log(dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    console.log(filename);
    const target = path.join(dir, filename);
    const writeStream = fs.createWriteStream(target);
    stream.pipe(writeStream);
  }
}
