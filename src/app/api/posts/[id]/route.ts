import { withSessionUser } from '@/libs/server/session';
import { getPost } from '@/libs/server/posts';
import { NextResponse, NextRequest } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(
  req: NextRequest,
  { params: { id: postId } }: Context
) {
  return withSessionUser(async () => {
    return getPost(postId) //
      .then((data) => NextResponse.json(data));
  });
}
