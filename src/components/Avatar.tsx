import { cls } from '@/libs/client/util';

type Props = {
  image?: string | null;
  size?: 'sm' | 'md';
  highlight?: boolean;
};

/**
 * provider에서 제공되는 도메인을 알 수 없기때문에 img tag 사용
 * x-box issue를 없애기 위해 referrerPolicy='no-referrer'
 */
export default function Avatar({
  image,
  size = 'md',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle({ size, highlight })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={cls(
          'rounded-full bg-white',
          size === 'sm' ? 'w-[30px] p-[2px]' : 'w-16 p-1'
        )}
        src={image ?? undefined}
        referrerPolicy='no-referrer'
        alt='user profile'
      />
    </div>
  );
}

function getContainerStyle({ size, highlight }: Omit<Props, 'image'>): string {
  const base =
    'rounded-full aspect-square cursor-pointer flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-br from-amber-300 via-rose-500 to-fuchsia-600'
    : '';
  const sizeStyle = size === 'sm' ? 'w-8' : 'w-[68px]';
  return cls(base, highlightStyle, sizeStyle);
}
