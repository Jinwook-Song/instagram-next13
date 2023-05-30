import { withSessionUser } from '@/libs/server/session';
import { createPost, getFollowingPostsOf } from '@/libs/server/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  withSessionUser(async (user) => {
    return getFollowingPostsOf(user.username) //
      .then((data) => NextResponse.json(data));
  });
}

export async function POST(req: NextRequest) {
  withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 });
    }

    return createPost(user.id, text, file) //
      .then((data) => NextResponse.json(data));
  });
}
