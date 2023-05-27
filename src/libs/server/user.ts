import { SearchUser } from '@/model/user';
import { client } from '@/sanity/lib/client';
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
    following: [],
    followers: [],
    bookmarks: [],
  });
}

/**
 * @see https://www.sanity.io/docs/query-cheat-sheet
 */
export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id,
    }`
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}*" || username match "*${keyword}*")`
    : ``;
  return client
    .fetch(
      `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }`
    )
    .then((users: SearchUser[]) =>
      users.map((user) => ({
        ...user,
        followers: user.followers ?? 0,
        following: user.following ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id": _id,
            "following": count(following),
            "followers": count(followers),
            "posts": count(*[_type == "post"&& author->username == "${username}"])
        }`
    )
    .then((user) => {
      if (user) {
        return {
          ...user,
          following: user.following ?? 0,
          followers: user.followers ?? 0,
          posts: user.posts ?? 0,
        };
      } else {
        return null;
      }
    });
}
