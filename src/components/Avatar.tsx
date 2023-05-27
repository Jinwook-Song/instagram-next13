import { cls } from '@/libs/client/util';

type Props = {
  image?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  highlight?: boolean;
};

/**
 * provider에서 제공되는 도메인을 알 수 없기때문에 img tag 사용
 * x-box issue를 없애기 위해 referrerPolicy='no-referrer'
 */
export default function Avatar({
  image,
  size = 'lg',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle({ size, highlight })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={cls(
          'rounded-full bg-white aspect-square object-cover',
          size === 'sm'
            ? 'w-[30px] p-[2px]'
            : size === 'md'
            ? 'w-[42px] p-[3px]'
            : size === 'lg'
            ? 'w-16 p-[4px]'
            : 'w-[138px] p-[8px]'
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
  const sizeStyle =
    size === 'sm'
      ? 'w-8'
      : size === 'md'
      ? 'w-[44px]'
      : size === 'lg'
      ? 'w-[68px]'
      : 'w-[142px]';
  return cls(base, highlightStyle, sizeStyle);
}
