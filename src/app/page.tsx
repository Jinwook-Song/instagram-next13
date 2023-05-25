import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

// SSR로 동작
export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className='w-full flex flex-col md:flex-row max-w-4xl p-4 gap-8'>
      <div className='basis-3/4 min-w-0'>
        <FollowingBar />
        <PostList />
      </div>
      <div className='basis-1/4'>
        <SideBar user={user} />
      </div>
    </section>
  );
}
