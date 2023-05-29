import useMe from '@/libs/client/hooks/useMe';
import usePosts from '@/libs/client/hooks/usePosts';
import { parseDate } from '@/libs/client/util';
import { Comment, SimplePost } from '@/model/post';
import CommentForm from './CommentForm';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ui/ToggleButton';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  function handleLike(like: boolean) {
    user && setLike(post, user.username!, like);
  }

  function handleBookmark(bookmark: boolean) {
    user && setBookmark(id, bookmark);
  }

  function handleComment(comment: string) {
    user && onComment({ comment, username: user.username, image: user.image! });
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
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-semibold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length !== 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
