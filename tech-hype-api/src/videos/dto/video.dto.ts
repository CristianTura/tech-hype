import { IsNumber, IsString } from 'class-validator';

export class VideoDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsString()
  thumbnail!: string;

  @IsString()
  publishedAt!: string;

  @IsNumber()
  hype!: number;
}

export class PaginationMetaDto {
  page!: number;
  limit!: number;
  total!: number;
  totalPages!: number;
}

export class GetVideosResponseDto {
  data: {
    topVideo: VideoDto | null;
    videos: VideoDto[];
  }
  meta!: PaginationMetaDto;
}
