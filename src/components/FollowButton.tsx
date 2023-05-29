'use client';

import useMe from '@/libs/client/hooks/useMe';
import { ProfileUser } from '@/model/user';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';
import Button from './ui/Button';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  // https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
  const { refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser?.following.find((user) => user.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  async function handleFollow() {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      refresh();
    });
  }
  return (
    <>
      {showButton && (
        <div className='relative'>
          {isUpdating && (
            <div className='absolute inset-0 cursor-not-allowed z-20 flex justify-center items-center'>
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            accentColor={text === 'Unfollow' ? ' red' : 'royalblue'}
          />
        </div>
      )}
    </>
  );
}
