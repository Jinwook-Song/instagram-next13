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

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFaIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFaIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFaIcon />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className='flex justify-between items-center px-6'>
      <Link href={'/'}>
        <h1 className='text-3xl font-semibold'>Instagram</h1>
      </Link>
      <nav className='flex gap-x-4 items-center p-4'>
        <ul className='flex'>
          {menu.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathname === href ? clickedIcon : icon}</Link>
            </li>
          ))}
        </ul>
        <ColorButton onClick={() => {}} text='Sign in' />
      </nav>
    </div>
  );
}
