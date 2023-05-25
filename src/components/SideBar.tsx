import { User } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: User;
};
export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div>
        {image && <Avatar image={image} />}
        <p>{username}</p>
        <p>{name}</p>
      </div>
      <p>
        About • Help • Press • API • Jobs • Privacy • Terms • Location •
        Language
      </p>
      <p>@Copyright INSTAGRAM from META</p>
    </>
  );
}
