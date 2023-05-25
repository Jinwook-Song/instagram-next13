import { Session } from 'next-auth';

export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};
