'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <div>
      <Link href={'/'}>
        <h1>Instagram</h1>
      </Link>
      <nav>
        <ul>
          {menu.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathname === href ? clickedIcon : icon}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
