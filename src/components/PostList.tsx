'use client';

import { SimplePost } from '@/model/post';
import useSwr from 'swr';

export default function PostList() {
  const { data: posts } = useSwr<SimplePost[]>('/api/posts');

  if (posts) {
    console.log(posts);
  }

  return (
    <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>
  );
}
