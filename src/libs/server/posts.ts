import { SimplePost, FullPost } from '@/model/post';
import { client, urlFor } from '@/sanity/lib/client';

function mapPosts(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor({ source: post.image }),
  }));
}

/**
 *
 * @see https://www.sanity.io/docs/query-cheat-sheet#e82ab8c0925b
 */
export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
    || author._ref in
    *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(mapPosts);
}

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt
  `;

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        comments[]{comment, "username": author->username, "image": author->image},
        "id": _id,
        "createdAt": _createdAt
    }`
    )
    .then((post: FullPost) => ({
      ...post,
      image: urlFor({ source: post.image }),
    }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
    | order(_createdAt desc) {
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
    | order(_createdAt desc) {
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
    | order(_createdAt desc) {
      ${simplePostProjection}
    }`
    )
    .then(mapPosts);
}

/**
 * @see https://www.sanity.io/docs/js-client#adding-elements-to-an-array
 * @param postId
 * @param userId
 * @returns
 */
export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

/**
 * @see https://www.sanity.io/docs/js-client#deleting-an-element-from-an-array
 * @param postId
 * @param userId
 * @returns
 */
export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: {
          _ref: userId,
          _type: 'reference',
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
