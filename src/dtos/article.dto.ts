import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ArticleModel {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  owner: string;
}
