'use client';

import { CacheKeysContext } from '@/context/CacheKeysContext';
import { cls } from '@/libs/client/util';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostGrid from './PostGrid';
import { BookmarkIcon, HeartIcon, PostIcon } from './ui/icons';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', icon: <PostIcon />, title: 'Posts' },
  {
    type: 'saved',
    icon: <BookmarkIcon className='w-3 aspect-square' />,
    title: 'Bookmarked',
  },
  {
    type: 'liked',
    icon: <HeartIcon className='w-3 aspect-square' />,
    title: 'Likeed',
  },
];

export default function UserPosts({ user }: Props) {
  const { username } = user;
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className='flex justify-center uppercase gap-x-12'>
        {tabs.map(({ type, icon, title }) => (
          <li
            className={cls(
              'p-4 cursor-pointer transition-colors flex items-center gap-x-2',
              type === query ? 'font-semibold border-t border-black' : ''
            )}
            onClick={() => setQuery(type)}
            key={type}
          >
            <button className='scale-150 md:scale-100' aria-label={title}>
              {icon}
            </button>
            <span className='hidden md:inline'>{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
