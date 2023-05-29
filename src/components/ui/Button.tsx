type Props = {
  text: string;
  onClick: () => void;
  accentColor?: string;
  disabled?: boolean;
};
export default function Button({
  text,
  onClick,
  accentColor = 'red',
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      style={{ backgroundColor: `${accentColor}` }}
      onClick={onClick}
      className='border-none rounded-md py-2 px-8 text-white font-semibold leading-4 disabled:cursor-not-allowed opacity-80 disabled:opacity-30'
    >
      {text}
    </button>
  );
}
