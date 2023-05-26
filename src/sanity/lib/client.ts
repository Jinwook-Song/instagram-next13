import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

import { apiVersion, dataset, projectId, useCdn, token } from '../env';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
});

type UrlInput = {
  source: SanityImageSource;
  width?: number;
};

/**
 * sanity에서 이미지 최적화
 * @see https://www.sanity.io/docs/image-url
 */
export function urlFor({ source, width = 800 }: UrlInput) {
  return imageUrlBuilder(client).image(source).width(width).url();
}
