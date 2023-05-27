import { SimplePost, FullPost } from '@/model/post';
import { client, urlFor } from '@/sanity/lib/client';

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
    .then((posts: SimplePost[]) =>
      posts.map((post) => ({ ...post, image: urlFor({ source: post.image }) }))
    );
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
        comments[]{comment, "username": author->username, "userImage": author->image},
        "id": _id,
        "createdAt": _createdAt
    }`
    )
    .then((post: FullPost) => ({
      ...post,
      image: urlFor({ source: post.image }),
    }));
}
