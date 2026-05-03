import {
  calculateHype,
  filterByAuthor,
  filterByMinHype,
  sortVideos,
} from './video-business-rules';
import { VideosSortBy, SortOrder } from '../dto/get-videos.query.dto';
import { Video } from '../models/video.model';

describe('video-business-rules', () => {
  describe('calculateHype', () => {
    it('calculates hype = (likes + comments) / views', () => {
      const hype = calculateHype({
        views: 100,
        likes: 10,
        comments: 5,
        title: 'My video',
      });
      expect(hype).toBeCloseTo(0.15, 10);
    });

    it('multiplies by 2 when title includes "tutorial" (case insensitive)', () => {
      const hype = calculateHype({
        views: 100,
        likes: 10,
        comments: 5,
        title: 'Great TuToRiAl',
      });
      expect(hype).toBeCloseTo(0.3, 10);
    });

    it('returns 0 when comments are disabled (comments missing)', () => {
      const hype = calculateHype({
        views: 100,
        likes: 10,
        comments: undefined,
        title: 'My video',
      });
      expect(hype).toBe(0);
    });

    it('returns 0 when views are 0', () => {
      const hype = calculateHype({
        views: 0,
        likes: 10,
        comments: 5,
        title: 'My video',
      });
      expect(hype).toBe(0);
    });
  });

  describe('filtering & sorting', () => {
    const videos: Video[] = [
      {
        title: 'A',
        author: 'John',
        thumbnail: '',
        publishedAt: new Date('2025-01-01T00:00:00.000Z'),
        hype: 0.9,
      },
      {
        title: 'B',
        author: 'john',
        thumbnail: '',
        publishedAt: new Date('2024-01-01T00:00:00.000Z'),
        hype: 0.1,
      },
      {
        title: 'C',
        author: 'Mary',
        thumbnail: '',
        publishedAt: new Date('2026-01-01T00:00:00.000Z'),
        hype: 0.5,
      },
    ];

    it('filters by author (case insensitive equality)', () => {
      const out = filterByAuthor(videos, 'JOHN');
      expect(out.map((v) => v.title).sort()).toEqual(['A', 'B']);
    });

    it('filters by minHype', () => {
      const out = filterByMinHype(videos, 0.5);
      expect(out.map((v) => v.title).sort()).toEqual(['A', 'C']);
    });

    it('sorts by hype desc', () => {
      const out = sortVideos(videos, VideosSortBy.HYPE, SortOrder.DESC);
      expect(out.map((v) => v.title)).toEqual(['A', 'C', 'B']);
    });

    it('sorts by date asc', () => {
      const out = sortVideos(videos, VideosSortBy.DATE, SortOrder.ASC);
      expect(out.map((v) => v.title)).toEqual(['B', 'A', 'C']);
    });
  });
});

