import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export interface ImageKitImage {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  filePath: string;
  tags: string[];
  isPrivateFile: boolean;
  customCoordinates: string | null;
  fileType: string;
  mime: string;
  size: number;
  height: number;
  width: number;
  hasAlpha: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ImageKitResponse {
  files: ImageKitImage[];
  totalCount: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folderPath = searchParams.get('folderPath') || '/captures';
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Environment variables (to be set by user)
    const imagekitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const imagekitPublicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const imagekitUrlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!imagekitPrivateKey || !imagekitPublicKey || !imagekitUrlEndpoint) {
      return NextResponse.json(
        { error: 'ImageKit credentials not configured' },
        { status: 500 }
      );
    }

    // Initialize ImageKit
    const imagekit = new ImageKit({
      publicKey: imagekitPublicKey,
      privateKey: imagekitPrivateKey,
      urlEndpoint: imagekitUrlEndpoint,
    });

    // Fetch images from ImageKit using the SDK
    const data = await imagekit.listFiles({
      path: folderPath,
      limit: limit,
      skip: skip,
    });

    // Filter only files (not folders) and transform the response
    const transformedImages = data
      .filter((item) => 'filePath' in item) // Only include files, not folders
      .map((image) => ({
        ...image,
        optimizedUrl: imagekit.url({
          path: image.filePath,
          transformation: [
            {
              width: 400,
              height: 400,
              cropMode: 'maintain_ratio',
              format: 'auto',
              quality: 80,
            },
          ],
        }),
        thumbnailUrl: imagekit.url({
          path: image.filePath,
          transformation: [
            {
              width: 200,
              height: 200,
              cropMode: 'maintain_ratio',
              format: 'auto',
              quality: 60,
            },
          ],
        }),
      }));

    return NextResponse.json({
      images: transformedImages,
      totalCount: transformedImages.length,
    });
  } catch (error) {
    console.error('Error fetching images from ImageKit:', error);
    
    // Better error handling with specific error types
    if (error instanceof Error) {
      if (error.message.includes('credentials')) {
        return NextResponse.json(
          { error: 'Invalid ImageKit credentials' },
          { status: 401 }
        );
      }
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Folder not found' },
          { status: 404 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
