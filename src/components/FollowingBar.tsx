'use client';

import { DetailUser } from '@/model/user';
import user from '@/sanity/schemas/user';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
  const users = data?.following;
  return (
    <section className='w-full min-h-[90px] flex justify-center items-center p-4 rounded-lg shadow-sm shadow-neutral-300 mb-4 overflow-x-scroll'>
      {loading ? (
        <BeatLoader color='#36d7b7' size={8} />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have followings`}</p>
      )}
      {users?.length ? (
        <ul className='w-full flex gap-2'>
          {[...users, ...users, ...users, ...users, ...users].map(
            ({ image, username }) => (
              <li key={username}>
                <Link
                  className='flex flex-col items-center w-[80px]'
                  href={`/user/${username}`}
                >
                  <Avatar image={image} highlight />
                  <p className='w-full truncate text-center text-sm'>
                    {username}
                  </p>
                </Link>
              </li>
            )
          )}
        </ul>
      ) : null}
    </section>
  );
}
