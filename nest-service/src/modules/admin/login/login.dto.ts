import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
} from 'class-validator';

// dto 前端传给后端的数据
export class ImageCaptchaDto {
	@ApiProperty({
		required: false,
		default: 100,
		description: '验证码宽度',
	})
  @Type(() => Number)
  @IsInt()
  @IsOptional()
	readonly width: number = 100;

  @ApiProperty({
		required: false,
		default: 50,
		description: '验证码高度',
	})
  @Type(() => Number)
  @IsInt()
  @IsOptional()
	readonly height: number = 50;
}
