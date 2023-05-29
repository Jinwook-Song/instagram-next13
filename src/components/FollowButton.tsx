'use client';

import useMe from '@/libs/client/hooks/useMe';
import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser?.following.find((user) => user.username === username);

  const text = following ? 'Unfollow' : 'Follow';
  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={() => {}}
          accentColor={text === 'Unfollow' ? ' red' : 'sky'}
        />
      )}
    </>
  );
}
