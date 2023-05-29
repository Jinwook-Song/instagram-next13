import useFullPost from '@/libs/client/hooks/useFullPost';
import { SimplePost } from '@/model/post';
import Image from 'next/image';
import ActionBar from './ActionBar';
import Avatar from './Avatar';
import PostUserAvatar from './PostUserAvatar';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { userImage, username, image } = post;
  const { post: data, postComment } = useFullPost(post.id);
  const comments = data?.comments;

  return (
    <section className='flex flex-col sm:flex-row w-full h-full'>
      <div className='relative basis-3/5'>
        <Image
          className='object-cover'
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
      </div>
      <div className='basis-2/5 flex flex-col'>
        <PostUserAvatar image={userImage} username={username} />
        <ul className='border-t border-gray-200 h-full overflow-y-auto p-4 mb-1'>
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, idx) => (
                <li key={idx} className='flex items-center mb-1 gap-x-2'>
                  <Avatar
                    image={image}
                    size='sm'
                    highlight={commentUsername === username}
                  />
                  <div className='flex gap-x-4'>
                    <span className='font-semibold'>{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
