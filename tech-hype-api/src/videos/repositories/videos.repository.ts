export interface VideosRepository<TProviderItem = unknown> {
  getAll(): Promise<TProviderItem[]>;
}

