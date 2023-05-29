import { ProfileUser, SearchUser } from '@/model/user';
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

export async function getUserForProfile(
  username: string
): Promise<ProfileUser | null> {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id": _id,
            "following": count(following),
            "followers": count(followers),
            "posts": count(*[_type == "post" && author->username == "${username}"])
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

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

/**
 * @see https://www.sanity.io/docs/js-client#multiple-mutations-in-a-transaction
 * transaction -> atomic operation (모든 호출이 안정적으로 동작하도록)
 * @param myId
 * @param targetId
 * @returns
 */
export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
