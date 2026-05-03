import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum VideosSortBy {
  HYPE = 'hype',
  DATE = 'date',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetVideosQueryDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? undefined : Number(value)))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  minHype?: number;

  @IsOptional()
  @IsEnum(VideosSortBy)
  sortBy?: VideosSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? 1 : Number(value)))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? 10 : Math.min(Number(value), 50)))
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  limit?: number = 10;
}
