export interface Video {
  title: string;
  author: string;
  thumbnail: string;
  publishedAt: Date;
  hype: number;
}

export interface YoutubeVideoListItem {
  id?: string;
  snippet?: {
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export interface YoutubeVideoListResponse {
  items?: YoutubeVideoListItem[];
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}