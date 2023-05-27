import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];
  return (
    <section className='w-full flex flex-col md:flex-row justify-center items-center py-12 border-b border-neutral-300 gap-4'>
      <Avatar image={image} highlight size='xl' />
      <div className='basis-1/3'>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <h1 className='text-2xl'>{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className='my-3 flex gap-4'>
          {info.map(({ title, data }, idx) => (
            <li key={idx}>
              <span className='font-semibold mr-1'>{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className='text-xl font-semibold text-center md:text-start'>
          {name}
        </p>
      </div>
    </section>
  );
}
