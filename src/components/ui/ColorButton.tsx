type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className='rounded-md bg-gradient-to-br from-amber-300 via-rose-500 to-fuchsia-600 p-[2px] overflow-hidden cursor-pointer'>
      <button
        className='bg-white rounded-md text-base px-1 py-[2px] hover:bg-opacity-30 transition-all hover:text-white'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
