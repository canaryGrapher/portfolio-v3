import { ImageKitImage } from '@/app/api/imagekit/images/route';

export interface OptimizedImageKitImage extends ImageKitImage {
  optimizedUrl: string;
  thumbnailUrl: string;
}

export interface ImageKitApiResponse {
  images: OptimizedImageKitImage[];
  totalCount: number;
}

export class ImageKitService {
  private static baseUrl = '/api/imagekit/images';

  static async getImages(
    folderPath: string = '/photos',
    limit: number = 50,
    skip: number = 0
  ): Promise<ImageKitApiResponse> {
    const params = new URLSearchParams({
      folderPath,
      limit: limit.toString(),
      skip: skip.toString(),
    });

    const response = await fetch(`${this.baseUrl}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    return response.json();
  }

  static async getAllImages(folderPath: string = '/photos'): Promise<OptimizedImageKitImage[]> {
    const allImages: OptimizedImageKitImage[] = [];
    let skip = 0;
    const limit = 50;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getImages(folderPath, limit, skip);
      allImages.push(...response.images);
      
      hasMore = response.images.length === limit;
      skip += limit;
    }

    return allImages;
  }
}
