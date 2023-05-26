'use client';

import { SimplePost } from '@/model/post';
import { GridLoader } from 'react-spinners';
import useSwr from 'swr';
import PostListCard from './ui/PostListCard';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSwr<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridLoader color='hotpink' />
        </div>
      )}
      {posts && (
        <ul className='flex flex-col gap-y-4'>
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
