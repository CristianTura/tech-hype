import { Injectable } from '@nestjs/common';
import { VideosRepository } from './videos.repository';
import { YoutubeVideoListItem, YoutubeVideoListResponse } from '../models/video.model';
import data from '../../../assets/mock-youtube-api.json';

@Injectable()
export class YoutubeJsonVideosRepository
  implements VideosRepository<YoutubeVideoListItem>
{
  async getAll(): Promise<YoutubeVideoListItem[]> {
    try {
      const parsed = data as YoutubeVideoListResponse;
      return Array.isArray(parsed.items) ? parsed.items : [];
    } catch (err) {
      throw new Error('Failed to load videos data');
    }
  }
}

