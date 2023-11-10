import { Inject } from '@nestjs/common';
import { REDIS_CLIENT, REDIS_DEFAULT_CLIENT_KEY } from '../redis/redis.constants';
import { Cluster } from 'cluster';
import { Redis } from 'ioredis';

export class RedisService {
	constructor(@Inject(REDIS_CLIENT) private readonly clients: Map<string, Redis | Cluster>) {}

  public getRedis(name = REDIS_DEFAULT_CLIENT_KEY): Redis {
    if (!this.clients.has(name)) {
      throw new Error(`Redis client ${name} not found`)
    }
    return this.clients.get(name) as Redis;
  }
}
