'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';
import {
  HomeFaIcon,
  HomeIcon,
  NewFaIcon,
  NewIcon,
  SearchFaIcon,
  SearchIcon,
} from './ui/icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFaIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFaIcon />,
    title: 'Search users',
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFaIcon />,
    title: 'New post',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className='flex justify-between items-center px-6'>
      <Link href={'/'} aria-label='Home'>
        <h1 className='text-3xl font-semibold'>Instagram</h1>
      </Link>
      <nav className='flex gap-x-4 items-center p-4'>
        <ul className='flex items-center gap-x-2'>
          {menu.map(({ href, icon, clickedIcon, title }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {pathname === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size='sm' highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton onClick={signOut} text='Sign out' />
            ) : (
              <ColorButton onClick={signIn} text='Sign in' />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
