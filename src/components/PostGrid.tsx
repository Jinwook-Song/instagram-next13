import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  return (
    <div className='w-full text-center'>
      {loading && <GridSpinner />}
      <ul className='grid grid-cols-3 gap-4 px-8 py-4'>
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={idx < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
