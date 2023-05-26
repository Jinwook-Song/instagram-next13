'use client';

import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
  const users = data?.following;
  return (
    <section className='w-full min-h-[120px] flex justify-center items-center p-4 rounded-lg shadow-sm shadow-neutral-300 mb-4 overflow-x-scroll'>
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
