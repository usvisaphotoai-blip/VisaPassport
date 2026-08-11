import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export const revalidate = 0; // Disable caching to fetch fresh images every time

const EXPECTED_PASSWORD = 'ypqb4zzehy';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const authHeader = request.headers.get('x-gallery-password');
    const providedPassword = body.password || authHeader;

    if (providedPassword !== EXPECTED_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    let allResources: any[] = [];
    let nextCursor: string | undefined = undefined;

    // First attempt: Use Cloudinary Search API (returns detailed metadata like tags, folder, etc.)
    try {
      do {
        let query = cloudinary.search
          .expression('resource_type:image')
          .sort_by('created_at', 'desc')
          .max_results(500);

        if (nextCursor) {
          query = query.next_cursor(nextCursor);
        }

        const result = await query.execute();
        if (result && result.resources && Array.isArray(result.resources)) {
          allResources.push(...result.resources);
        }
        nextCursor = result.next_cursor;
      } while (nextCursor);
    } catch (searchError) {
      console.warn('[Cloudinary Gallery] Search API fallback to resources API:', searchError);
      // Fallback: Use Admin API resources
      let cursor: string | undefined = undefined;
      do {
        const res: any = await cloudinary.api.resources({
          type: 'upload',
          resource_type: 'image',
          max_results: 500,
          next_cursor: cursor,
        });

        if (res && res.resources && Array.isArray(res.resources)) {
          allResources.push(...res.resources);
        }
        cursor = res.next_cursor;
      } while (cursor);
    }

    // Transform resources into structured payload
    const photos = allResources.map((res: any) => ({
      id: res.public_id,
      url: res.url,
      secure_url: res.secure_url,
      created_at: res.created_at || res.uploaded_at,
      bytes: res.bytes || 0,
      format: res.format || 'jpg',
      width: res.width || 0,
      height: res.height || 0,
      folder: res.folder || (res.public_id.includes('/') ? res.public_id.split('/')[0] : ''),
      filename: res.public_id.split('/').pop() || res.public_id,
      tags: res.tags || [],
    }));

    const totalBytes = photos.reduce((acc, curr) => acc + (curr.bytes || 0), 0);

    return NextResponse.json({
      success: true,
      count: photos.length,
      totalBytes,
      photos,
    });
  } catch (error: any) {
    console.error('[Cloudinary Gallery Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch photos from Cloudinary' },
      { status: 500 }
    );
  }
}
