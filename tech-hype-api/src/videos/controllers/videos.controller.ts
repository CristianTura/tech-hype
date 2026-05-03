import { Controller, Get, Query } from '@nestjs/common';
import { GetVideosQueryDto } from '../dto/get-videos.query.dto';
import { GetVideosResponseDto } from '../dto/video.dto';
import { VideosService } from '../services/videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async getVideos(@Query() query: GetVideosQueryDto): Promise<GetVideosResponseDto> {
    return this.videosService.getVideos(query);
  }
}

