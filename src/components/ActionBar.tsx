import { parseDate } from '@/libs/client/util';
import { SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ui/ToggleButton';

type Props = {
  post: SimplePost;
};
export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);

  const { mutate } = useSWRConfig();

  function handleLike(like: boolean) {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then(() => mutate('/api/posts'));
  }

  return (
    <>
      <div className='flex justify-between my-2 px-2'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-semibold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length !== 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className='font-semibold mr-1'>{username}</span>
            {text}
          </p>
        )}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
