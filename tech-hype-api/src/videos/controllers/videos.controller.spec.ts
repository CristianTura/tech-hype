import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from '../services/videos.service';
import { GetVideosQueryDto, VideosSortBy, SortOrder } from '../dto/get-videos.query.dto';
import { GetVideosResponseDto } from '../dto/video.dto';

describe('VideosController', () => {
  let controller: VideosController;
  let service: jest.Mocked<VideosService>;

  const mockResponse: GetVideosResponseDto = {
    data: {
      topVideo: {
        title: 'Tutorial de React',
        author: 'JuniorDev99',
        thumbnail: 'http://example.com/thumb.jpg',
        publishedAt: '2 years ago',
        hype: 0.11,
      },
      videos: [
        {
          title: 'Tutorial de Vue',
          author: 'SeniorPro',
          thumbnail: 'http://example.com/thumb2.jpg',
          publishedAt: '1 year ago',
          hype: 0.11,
        },
      ],
    },
    meta: {
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: VideosService,
          useValue: {
            getVideos: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get(VideosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getVideos', () => {
    it('should return videos response without query params', async () => {
      service.getVideos.mockResolvedValue(mockResponse);

      const result = await controller.getVideos({});

      expect(service.getVideos).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResponse);
    });

    it('should pass query parameters to service', async () => {
      const query: GetVideosQueryDto = {
        author: 'Junior',
        minHype: 0.1,
        page: 2,
        limit: 5,
        sortBy: VideosSortBy.HYPE,
        order: SortOrder.ASC,
      };

      service.getVideos.mockResolvedValue(mockResponse);

      const result = await controller.getVideos(query);

      expect(service.getVideos).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty query object', async () => {
      service.getVideos.mockResolvedValue(mockResponse);

      const result = await controller.getVideos({});

      expect(service.getVideos).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResponse);
    });

    it('should handle partial query parameters', async () => {
      const query: Partial<GetVideosQueryDto> = {
        author: 'Dev',
        page: 1,
      };

      service.getVideos.mockResolvedValue(mockResponse);

      const result = await controller.getVideos(query as GetVideosQueryDto);

      expect(service.getVideos).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate service errors', async () => {
      const error = new Error('Service error');
      service.getVideos.mockRejectedValue(error);

      await expect(controller.getVideos({})).rejects.toThrow('Service error');
      expect(service.getVideos).toHaveBeenCalledWith({});
    });
  });
});
