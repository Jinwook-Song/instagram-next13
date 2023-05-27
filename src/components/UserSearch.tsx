'use client';

import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section className='w-full max-w-4xl flex flex-col items-center gap-y-8 my-4'>
      <form className='w-2/3' onSubmit={onSubmit}>
        <input
          className='w-full text-lg p-3 outline-none border border-gray-400'
          type='text'
          autoFocus
          placeholder='Search for a username or name'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>Something wrong...</p>}
      {loading && <GridSpinner />}
      {!loading && !error && users?.length === 0 && (
        <p>찾는 사용자가 없습니다</p>
      )}
      <ul className='w-full p-4 flex flex-col gap-y-4'>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
