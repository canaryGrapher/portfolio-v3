import { NextRequest, NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export const runtime = 'nodejs';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const FOLDER = '/thoughts';

/** POST multipart/form-data with a `file` field. Auth enforced by middleware. */
export async function POST(request: NextRequest) {
  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    return NextResponse.json(
      { success: false, error: 'ImageKit credentials not configured' },
      { status: 500 }
    );
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    file = form.get('file') as File | null;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { success: false, error: `Unsupported type: ${file.type || 'unknown'}` },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, error: 'File exceeds the 10 MB limit' },
      { status: 413 }
    );
  }

  try {
    const imagekit = new ImageKit({
      publicKey: IMAGEKIT_PUBLIC_KEY,
      privateKey: IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');

    const uploaded = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${safeName}`,
      folder: FOLDER,
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        url: imagekit.url({
          path: uploaded.filePath,
          transformation: [{ width: 1600, format: 'auto', quality: 85 }],
        }),
        thumbnailUrl: imagekit.url({
          path: uploaded.filePath,
          transformation: [{ width: 400, format: 'auto', quality: 70 }],
        }),
        fileId: uploaded.fileId,
        name: uploaded.name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
