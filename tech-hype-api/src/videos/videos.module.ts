import { Module } from '@nestjs/common';
import { VideosController } from './controllers/videos.controller';
import { VideosService } from './services/videos.service';
import { YoutubeJsonVideosRepository } from './repositories/youtube-json-videos.repository';
import { YoutubeVideoMapper } from './mappers/youtube-video.mapper';

@Module({
  controllers: [VideosController],
  providers: [VideosService, YoutubeJsonVideosRepository, YoutubeVideoMapper],
})
export class VideosModule {}

