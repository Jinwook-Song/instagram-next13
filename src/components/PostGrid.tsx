import usePosts from '@/libs/client/hooks/usePosts';
import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';

export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <div className='w-full text-center'>
      {isLoading && <GridSpinner />}
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
