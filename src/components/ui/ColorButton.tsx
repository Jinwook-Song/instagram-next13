import { cls } from '@/libs/client/util';

type Props = {
  text: string;
  onClick: () => void;
  size?: 'sm' | 'lg';
};

export default function ColorButton({ text, onClick, size = 'sm' }: Props) {
  return (
    <div
      className={cls(
        'rounded-md bg-gradient-to-br from-amber-300 via-rose-500 to-fuchsia-600 overflow-hidden cursor-pointer',
        size === 'sm' ? 'p-[2px]' : 'p-1'
      )}
    >
      <button
        className={cls(
          'bg-white rounded-[4px] text-base hover:bg-opacity-30 transition-all hover:text-white',
          size === 'sm' ? 'px-1 py-[2px]' : 'px-2 py-1 text-2xl'
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
