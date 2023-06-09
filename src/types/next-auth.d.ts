import { AuthUser } from '@/model/user';
import NextAuth, { DefaultSession } from 'next-auth';

/**
 * @see https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
 */
declare module 'next-auth' {
  interface Session {
    user: AuthUser;
    // user: {
    //   username: string;
    // } & DefaultSession['user'];
  }
}
