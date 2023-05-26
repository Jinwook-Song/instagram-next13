'use client';

import { SimplePost } from '@/model/post';
import useSwr from 'swr';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSwr<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul className='flex flex-col gap-y-4'>
          {posts &&
            posts.map((post, idx) => (
              <li key={post.id}>
                <PostListCard post={post} priority={idx < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
