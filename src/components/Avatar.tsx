type Props = {
  image?: string | null;
};

/**
 * provider에서 제공되는 도메인을 알 수 없기때문에 img tag 사용
 * x-box issue를 없애기 위해 referrerPolicy='no-referrer'
 */
export default function Avatar({ image }: Props) {
  return (
    <div className='rounded-full bg-gradient-to-br from-amber-300 via-rose-500 to-fuchsia-600 overflow-hidden cursor-pointer w-8 aspect-square'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className='rounded-full p-[2px]'
        src={image ?? undefined}
        referrerPolicy='no-referrer'
        alt='user profile'
      />
    </div>
  );
}
