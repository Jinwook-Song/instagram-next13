import Avatar from './Avatar';

type Props = {
  image: string;
  username: string;
};
export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className='flex items-center p-2 gap-x-2'>
      <Avatar image={image} size='md' highlight />
      <span className='text-gray-900 font-semibold'>{username}</span>
    </div>
  );
}
