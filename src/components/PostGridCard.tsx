'use client';

import { SimplePost } from '@/model/post';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import PostDetail from './PostDetail';
import PostModal from './PostModal';
import ModalPortal from './ui/ModalPortal';

type Props = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostGridCard({ post, priority = false }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { image, username } = post;

  const { data: session } = useSession();

  function handleOpenPost() {
    if (!session?.user) {
      // sign in event가 발생하면 sign in page로 이동
      return signIn();
    }
    setShowModal(true);
  }

  return (
    <div className='relative w-full aspect-square'>
      <Image
        className='object-cover'
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes='650px'
        priority={priority}
        onClick={handleOpenPost}
      />
      {showModal && (
        <ModalPortal>
          <PostModal onClose={() => setShowModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
