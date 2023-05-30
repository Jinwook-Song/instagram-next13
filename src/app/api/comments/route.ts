import { withSessionUser } from '@/libs/server/session';
import { addComment } from '@/libs/server/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: postId, comment } = await req.json();

    if (!postId || comment === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    return addComment(postId, user.id, comment)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
