import { searchUsers } from '@/libs/server/user';
import { NextResponse } from 'next/server';

// 요청할때마다 항상 새로 실행되도록 (static 하지 않게)
export const dynamic = 'force-dynamic';

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
}
