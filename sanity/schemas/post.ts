import { Rule } from './../../node_modules/pluralize-esm/src/index';
import { title } from 'process';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          name: 'comment',
          title: 'Comment',
          type: 'document',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{ type: 'user' }],
            },
            {
              name: 'comment',
              title: 'Comment',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      media: 'photo',
    },
    prepare(selection) {
      const { title, authorName, media } = selection;
      return {
        title,
        subtitle: `by ${authorName}`,
        media,
      };
    },
  },
});
