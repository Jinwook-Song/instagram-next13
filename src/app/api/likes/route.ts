import { withSessionUser } from '@/libs/server/session';
import { dislikePost, likePost } from '@/libs/server/posts';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  withSessionUser(async (user) => {
    const { id: postId, like } = await req.json();

    if (!postId || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(postId, user.id)
      .then((data) => NextResponse.json(data))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
