import { searchUsers } from '@/libs/server/user';
import { NextResponse, NextRequest } from 'next/server';

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, { params: { keyword } }: Context) {
  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
