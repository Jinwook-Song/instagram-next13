import { parseDate } from '@/libs/client/util';
import { SimplePost } from '@/model/post';
import { BookmarkIcon, HeartIcon } from './ui/icons';

type Props = {
  post: SimplePost;
};
export default function ActionBar({
  post: { likes, username, text, createdAt },
}: Props) {
  return (
    <>
      <div className='flex justify-between my-2 px-4'>
        <HeartIcon />
        <BookmarkIcon />
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
