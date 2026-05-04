import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { VideosRepository } from './videos.repository';
import { YoutubeVideoListItem, YoutubeVideoListResponse } from '../models/video.model';

@Injectable()
export class YoutubeJsonVideosRepository
  implements VideosRepository<YoutubeVideoListItem>
{
  private readonly filePath = join(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? 'dist' : 'src',
    'data',
    'mock-youtube-api.json',
  );

  async getAll(): Promise<YoutubeVideoListItem[]> {
    try {
      const raw = await readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(raw) as YoutubeVideoListResponse;
      return Array.isArray(parsed.items) ? parsed.items : [];
    } catch (err) {
      throw new InternalServerErrorException('Failed to load videos data');
    }
  }
}

