'use client';

import useMe from '@/libs/client/hooks/me';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  const { user, isLoading: loading, error } = useMe();
  const users = user?.following;
  return (
    <section className='w-full min-h-[120px] flex justify-center items-center p-4 rounded-lg shadow-sm shadow-neutral-300 mb-4 overflow-x-scroll relative z-0'>
      {loading ? (
        <PropagateLoader color='hotpink' size={8} />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have followings`}</p>
      )}
      {users?.length ? (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className='flex flex-col items-center w-[80px]'
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className='w-full truncate text-center text-sm'>{username}</p>
            </Link>
          ))}
        </ScrollableBar>
      ) : null}
    </section>
  );
}
