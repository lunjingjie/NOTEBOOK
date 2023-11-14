import { UtilService } from './services/util.service';
import { CacheModule, Global, Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { ConfigurationKeyPaths } from 'src/config/configuration';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

const provides = [UtilService, RedisService];

@Global()
@Module({
	imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    // redis cache
    CacheModule.register(),
    // jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigurationKeyPaths>) => ({
        secret: configService.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    // 注册redis
    RedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigurationKeyPaths>) => ({
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
        password: configService.get<string>('redis.password'),
        db: configService.get<number>('redis.db'),
      }),
      inject: [ConfigService],
    }),
  ],
	providers: [...provides],
	exports: [HttpModule, CacheModule, JwtModule, ...provides]
})
export class SharedModule {}
