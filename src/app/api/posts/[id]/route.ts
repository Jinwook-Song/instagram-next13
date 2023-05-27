import { getFollowingPostsOf, getPost } from '@/libs/server/posts';
import { getServerSession } from 'next-auth/next';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

type Context = {
  params: { id: string };
};

export async function GET(
  req: NextRequest,
  { params: { id: postId } }: Context
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getPost(postId) //
    .then((data) => NextResponse.json(data));
}
