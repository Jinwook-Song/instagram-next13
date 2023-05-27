'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';

type Props = {
  user: ProfileUser;
};

export type TabType = 'posts' | 'saved' | 'liked';

export default function UserPosts({ user }: Props) {
  const { username } = user;
  const [tab, setTab] = useState<TabType>('posts');
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);
  return <div>UserPosts</div>;
}
