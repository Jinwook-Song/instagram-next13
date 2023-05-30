import { withSessionUser } from '@/libs/server/session';
import { getUserByUsername } from '@/libs/server/user';
import { NextResponse } from 'next/server';

export async function GET() {
  withSessionUser(async (user) => {
    return getUserByUsername(user.username).then((data) =>
      NextResponse.json(data)
    );
  });
}
