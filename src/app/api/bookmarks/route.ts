import { withSessionUser } from '@/libs/server/session';
import { addBookmark, removeBookmark } from '@/libs/server/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: postId, bookmark } = await req.json();

    if (!postId || bookmark === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, postId)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
