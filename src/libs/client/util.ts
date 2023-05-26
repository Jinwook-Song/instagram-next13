import { format } from 'timeago.js';

export function cls(...className: string[]) {
  return className.join(' ');
}

export function parseDate(data: string) {
  return format(data);
}
