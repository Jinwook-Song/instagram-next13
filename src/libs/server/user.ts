import { client } from '../../../sanity/lib/client';
import { Session } from 'next-auth';

export type OAuthUser = {
  id: string;
} & Session['user'];

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    follwing: [],
    follwers: [],
    bookmarks: [],
  });
}
