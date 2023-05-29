import usePosts from '@/libs/client/hooks/usePosts';
import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const cacheKey = `/api/users/${username}/${query}`;
  const { posts, isLoading } = usePosts(cacheKey);

  return (
    <div className='w-full text-center'>
      {isLoading && <GridSpinner />}
      <ul className='grid grid-cols-3 gap-4 px-8 py-4'>
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id}>
              <PostGridCard
                post={post}
                priority={idx < 6}
                cacheKey={cacheKey}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
