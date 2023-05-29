'use client';

import usePosts from '@/libs/client/hooks/posts';
import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import PostUserAvatar from './PostUserAvatar';
import ModalPortal from './ui/ModalPortal';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;

  const [showModal, setShowModal] = useState(false);

  const { postComment } = usePosts();
  function handlePostComment(comment: string) {
    postComment(post, comment);
  }

  return (
    <article className='rounded-lg shadow-md border border-gray-200'>
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setShowModal(true)}
      />
      <ActionBar post={post}>
        {text && (
          <p>
            <span className='font-semibold mr-1'>{username}</span>
            {text}
          </p>
        )}
        {comments > 1 && (
          <button
            className='font-semibold my-2 text-sky-500'
            onClick={() => setShowModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentForm onPostComment={handlePostComment} />
      {showModal && (
        <ModalPortal>
          <PostModal onClose={() => setShowModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
