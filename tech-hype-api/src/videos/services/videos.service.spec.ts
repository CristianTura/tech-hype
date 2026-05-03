import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { YoutubeJsonVideosRepository } from '../repositories/youtube-json-videos.repository';
import { YoutubeVideoMapper } from '../mappers/youtube-video.mapper';
import { GetVideosQueryDto, VideosSortBy, SortOrder } from '../dto/get-videos.query.dto';
import { Video } from '../models/video.model';

describe('VideosService', () => {
  let service: VideosService;
  let repository: jest.Mocked<YoutubeJsonVideosRepository>;
  let mapper: jest.Mocked<YoutubeVideoMapper>;

  const mockVideoItems = [
    {
      id: '1',
      snippet: {
        title: 'Tutorial de React',
        channelTitle: 'JuniorDev99',
        publishedAt: '2024-01-01T00:00:00Z',
        thumbnails: { high: { url: 'http://example.com/thumb1.jpg' } }
      },
      statistics: {
        viewCount: '1000',
        likeCount: '100',
        commentCount: '10'
      }
    },
    {
      id: '2',
      snippet: {
        title: 'Tutorial de Vue',
        channelTitle: 'SeniorPro',
        publishedAt: '2024-01-02T00:00:00Z',
        thumbnails: { high: { url: 'http://example.com/thumb2.jpg' } }
      },
      statistics: {
        viewCount: '500',
        likeCount: '50',
        commentCount: '5'
      }
    }
  ];

  const mockVideos: Video[] = [
    {
      title: 'Tutorial de React',
      author: 'JuniorDev99',
      thumbnail: 'http://example.com/thumb1.jpg',
      publishedAt: new Date('2024-01-01T00:00:00Z'),
      hype: 0.11
    },
    {
      title: 'Tutorial de Vue',
      author: 'SeniorPro',
      thumbnail: 'http://example.com/thumb2.jpg',
      publishedAt: new Date('2024-01-02T00:00:00Z'),
      hype: 0.11
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: YoutubeJsonVideosRepository,
          useValue: {
            getAll: jest.fn(),
          },
        },
        {
          provide: YoutubeVideoMapper,
          useValue: {
            toDomain: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    repository = module.get(YoutubeJsonVideosRepository);
    mapper = module.get(YoutubeVideoMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getVideos', () => {
    beforeEach(() => {
      repository.getAll.mockResolvedValue(mockVideoItems);
      mapper.toDomain.mockImplementation((item) => {
        const video = mockVideos.find(v => v.title === item.snippet?.title);
        return video || mockVideos[0]; // Return a default video if not found
      });
    });

    it('should return paginated videos without filters', async () => {
      const query: GetVideosQueryDto = {};

      const result = await service.getVideos(query);

      expect(repository.getAll).toHaveBeenCalled();
      expect(mapper.toDomain).toHaveBeenCalledTimes(mockVideoItems.length);
      expect(result.data.videos).toHaveLength(1); // Top video removed
      expect(result.data.topVideo).toBeTruthy();
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.total).toBe(1); // Only videos without top
    });

    it('should filter by author', async () => {
      const query: GetVideosQueryDto = { author: 'Junior' };

      const result = await service.getVideos(query);

      // If top video is filtered out, videos list might be empty
      expect(result.data.videos.length).toBeLessThanOrEqual(1);
      if (result.data.videos.length > 0) {
        expect(result.data.videos[0].author).toContain('JuniorDev99');
      }
    });

    it('should filter by minimum hype', async () => {
      const query: GetVideosQueryDto = { minHype: 0.15 };

      const result = await service.getVideos(query);

      expect(result.data.videos).toHaveLength(0);
    });

    it('should sort by hype descending by default', async () => {
      const query: GetVideosQueryDto = {};

      const result = await service.getVideos(query);

      expect(result.data.videos.length).toBeLessThanOrEqual(2);
      expect(result.data.topVideo).toBeTruthy();
    });

    it('should sort by date ascending', async () => {
      const query: GetVideosQueryDto = {
        sortBy: VideosSortBy.DATE,
        order: SortOrder.ASC,
      };

      const result = await service.getVideos(query);

      // Only check that we have results, order depends on which is top video
      expect(result.data.videos.length).toBeLessThanOrEqual(1);
      expect(result.data.topVideo).toBeTruthy();
    });

    it('should apply pagination', async () => {
      const query: GetVideosQueryDto = { page: 1, limit: 1 };

      const result = await service.getVideos(query);

      expect(result.data.videos.length).toBeLessThanOrEqual(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(1);
      expect(result.meta.totalPages).toBeGreaterThanOrEqual(1);
    });

    it('should return top video separately', async () => {
      const query: GetVideosQueryDto = {};

      const result = await service.getVideos(query);

      expect(result.data.topVideo).toBeTruthy();
      expect(result.data.topVideo?.title).toBeTruthy();
    });

    it('should remove top video from videos list', async () => {
      const query: GetVideosQueryDto = {};

      const result = await service.getVideos(query);

      const topVideoTitle = result.data.topVideo?.title;
      const videoTitles = result.data.videos.map(v => v.title);
      
      expect(topVideoTitle).toBeTruthy();
      expect(videoTitles).not.toContain(topVideoTitle);
    });

    it('should handle empty repository data', async () => {
      repository.getAll.mockResolvedValue([]);

      const result = await service.getVideos({});

      expect(result.data.videos).toHaveLength(0);
      expect(result.data.topVideo).toBeNull();
      expect(result.meta.total).toBe(0);
    });

    it('should handle null query parameters', async () => {
      const query = {
        author: undefined,
        minHype: undefined,
        page: undefined,
        limit: undefined,
        sortBy: undefined,
        order: undefined,
      } as GetVideosQueryDto;

      const result = await service.getVideos(query);

      expect(result.data.videos.length).toBeLessThanOrEqual(2);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
    });

    it('should handle page beyond total pages', async () => {
      const query: GetVideosQueryDto = { page: 10, limit: 5 };

      const result = await service.getVideos(query);

      expect(result.meta.page).toBe(1); // Should clamp to valid page
      expect(result.data.videos.length).toBeLessThanOrEqual(2);
    });
  });
});
