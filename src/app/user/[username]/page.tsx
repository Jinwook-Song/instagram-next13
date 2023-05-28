import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/libs/server/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// 동일한 username에 대해서 두번 fetch하지 않도록
const getUser = cache(async (username: string) => getUserForProfile(username));

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) • Instagram Photos`,
    description: `${user?.name}'s all Instagram posts`,
  };
}

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
