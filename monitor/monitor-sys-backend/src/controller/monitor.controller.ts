import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { parseStackTrack, getOriginalErrorStack } from '../utils/stackparser';
import { Context } from '@midwayjs/koa';

@Controller('/monitor')
export class MonitorController {
  @Inject()
  ctx: Context;

  @Get('/error')
  async resolveError(@Query('info') info) {
    const json = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'));
    console.warn(json);

    const stackFrame = parseStackTrack(json.stack, json.message);
    const originStack = await getOriginalErrorStack(stackFrame);
    console.log('=====', originStack);
  }
}
