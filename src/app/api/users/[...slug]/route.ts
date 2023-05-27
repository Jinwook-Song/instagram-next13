import { TabType } from '@/components/UserPosts';
import {
  getLikedPostsOf,
  getPostsOf,
  getSavedPostsOf,
} from '@/libs/server/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;
  const tab = query as TabType;

  // 함수를 참조하기만 한 상태, 실행 ❌
  let request = getPostsOf;
  if (tab === 'saved') request = getSavedPostsOf;
  else if (tab === 'liked') request = getLikedPostsOf;

  return request(username).then((data) => NextResponse.json(data));
}
