import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// sanity calls this on publish; the signature check needs SANITY_REVALIDATE_SECRET set in both places
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );
    if (!isValidSignature) {
      return NextResponse.json({ message: 'invalid signature' }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'no _type in body' }, { status: 400 });
    }
    // every content type shows on the home page; photos also render at /photos
    const paths = ['/'];
    if (body._type === 'photoSet') paths.push('/photos');
    for (const path of paths) revalidatePath(path);
    return NextResponse.json({ revalidated: true, paths, type: body._type, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}
