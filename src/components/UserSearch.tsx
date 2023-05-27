'use client';

import { useState } from 'react';
import useSWR from 'swr';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('ji');
  const { data, isLoading: loading } = useSWR(`/api/search/${keyword}`);

  console.log(data);
  return <div>UserSearch</div>;
}
