import { Injectable } from '@nestjs/common';
import { Video } from '../models/video.model';
import { YoutubeVideoListItem } from '../models/video.model';
import { calculateHype } from '../services/video-business-rules';

@Injectable()
export class YoutubeVideoMapper {
  toDomain(item: YoutubeVideoListItem): Video {
    const title = item.snippet?.title ?? '';
    const author = item.snippet?.channelTitle ?? '';
    const thumbnail = item.snippet?.thumbnails?.high?.url ?? '';

    const publishedAtRaw = item.snippet?.publishedAt;
    const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date(0);

    const views = toNumber(item.statistics?.viewCount);
    const likes = toNumber(item.statistics?.likeCount);
    const comments =
      item.statistics?.commentCount === undefined
        ? undefined
        : toNumber(item.statistics.commentCount);

    const hype = calculateHype({ views, likes, comments, title });

    return { title, author, thumbnail, publishedAt, hype };
  }
}

function toNumber(value: string | undefined): number {
  if (value === undefined) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
