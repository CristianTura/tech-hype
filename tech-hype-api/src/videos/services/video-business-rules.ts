import { VideosSortBy, SortOrder } from '../dto/get-videos.query.dto';
import { Video } from '../models/video.model';

export type HypeInputs = {
  views: number;
  likes: number;
  comments?: number; // undefined => comments disabled
  title: string;
};

export function calculateHype({
  views,
  likes,
  comments,
  title,
}: HypeInputs): number {
  if (comments === undefined) return 0;
  if (!Number.isFinite(views) || views <= 0) return 0;

  const base = (safeNonNegative(likes) + safeNonNegative(comments)) / views;
  const multiplier = /\btutorial\b/i.test(title) ? 2 : 1;

  return base * multiplier;
}

export function filterByAuthor(videos: Video[], author?: string): Video[] {
  if (!author) return videos;
  const normalized = author.trim().toLowerCase();
  if (!normalized) return videos;
  return videos.filter((v) => v.author.trim().toLowerCase().includes(normalized));
}

export function filterByMinHype(videos: Video[], minHype?: number): Video[] {
  if (minHype === undefined) return videos;
  return videos.filter((v) => v.hype >= minHype);
}

export function sortVideos(
  videos: Video[],
  sortBy: VideosSortBy = VideosSortBy.HYPE,
  order: SortOrder = SortOrder.DESC,
): Video[] {
  const dir = order === SortOrder.ASC ? 1 : -1;
  const sorted = [...videos].sort((a, b) => {
    if (sortBy === VideosSortBy.DATE) {
      return (a.publishedAt.getTime() - b.publishedAt.getTime()) * dir;
    }
    return (a.hype - b.hype) * dir;
  });
  return sorted;
}

export function getTopVideo(videos: Video[]): Video | null {
  if (videos.length === 0) return null;
  return videos.reduce((best, v) => (v.hype > best.hype ? v : best), videos[0]);
}

function safeNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}
