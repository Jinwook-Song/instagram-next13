import { FormEvent, useState } from 'react';
import { SendIcon, SmileIcon } from './ui/icons';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const disabled = comment.length === 0;
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center border-t border-neutral-300 px-3'
    >
      <SmileIcon />
      <input
        className='w-full ml-2 border-none outline-none p-3'
        type='text'
        placeholder='Add a comment...'
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={disabled}
        className='font-semibold text-sky-500 rounded-full aspect-square p-1 hover:bg-sky-200 hover:text-white transition-colors ml-2 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-sky-500 disabled:opacity-30'
      >
        <SendIcon />
      </button>
    </form>
  );
}
