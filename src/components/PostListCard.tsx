import { SimplePost } from '@/model/post';
import Image from 'next/image';
import ActionBar from './ActionBar';
import Avatar from './Avatar';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image } = post;

  return (
    <article className='rounded-lg shadow-md border border-gray-200'>
      <div className='flex items-center p-2 gap-x-2'>
        <Avatar image={userImage} size='md' highlight />
        <span className='text-gray-900 font-semibold'>{username}</span>
      </div>
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar post={post} />
      <CommentForm />
    </article>
  );
}
