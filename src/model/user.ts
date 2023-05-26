export type User = {
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
