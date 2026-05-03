import { Injectable } from '@nestjs/common';
import { GetVideosQueryDto, SortOrder, VideosSortBy } from '../dto/get-videos.query.dto';
import { GetVideosResponseDto, VideoDto } from '../dto/video.dto';
import { YoutubeVideoMapper } from '../mappers/youtube-video.mapper';
import { YoutubeJsonVideosRepository } from '../repositories/youtube-json-videos.repository';
import { Video } from '../models/video.model';
import {
  filterByAuthor,
  filterByMinHype,
  getTopVideo,
  sortVideos,
} from './video-business-rules';
import { toRelativeTime } from './relative-time';
import { paginate } from '../utils/pagination.util';

@Injectable()
export class VideosService {
  constructor(
    private readonly repository: YoutubeJsonVideosRepository,
    private readonly mapper: YoutubeVideoMapper,
  ) {}

  async getVideos(query: GetVideosQueryDto): Promise<GetVideosResponseDto> {
    const rawItems = await this.repository.getAll();
    const allVideos = rawItems.map((i) => this.mapper.toDomain(i));

    const filtered = this.applyFilters(allVideos, query);
    const topVideo = getTopVideo(filtered);

    const sortBy = query.sortBy ?? VideosSortBy.HYPE;
    const order = query.order ?? SortOrder.DESC;
    const sorted = sortVideos(filtered, sortBy, order);

    const videosWithoutTop = topVideo 
      ? sorted.filter(v => !(v.title === topVideo.title && v.author === topVideo.author))
      : sorted;

    const paginatedResult = paginate(
      videosWithoutTop.map((v) => this.toDto(v)),
      query.page ?? 1,
      query.limit ?? 10
    );

    return {
      data: {
        topVideo: topVideo ? this.toDto(topVideo) : null,
        videos: paginatedResult.data,
      },
      meta: paginatedResult.meta
    };
  }

  private applyFilters(videos: Video[], query: GetVideosQueryDto): Video[] {
    const byAuthor = filterByAuthor(videos, query.author);
    return filterByMinHype(byAuthor, query.minHype);
  }

  private toDto(video: Video): VideoDto {
    return {
      title: video.title,
      author: video.author,
      thumbnail: video.thumbnail,
      publishedAt: toRelativeTime(video.publishedAt),
      hype: roundTo(video.hype, 6),
    };
  }
}

function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

