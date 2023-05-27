import { ProfileUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};

export default function UserCard({
  user: { name, username, image, followers, following },
}: Props) {
  return (
    <Link
      className='w-full flex gap-x-4 items-center rounded-sm shadow-md border border-neutral-300 p-4 bg-white hover:-translate-y-1 transition-transform hover:bg-neutral-50'
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className='text-neutral-500'>
        <p className='text-black font-semibold leading-4'>{username}</p>
        <p>{name}</p>
        <p className='text-sm leading-4'>{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
