type Props = {
  text: string;
  onClick: () => void;
  accentColor?: string;
};
export default function Button({ text, onClick, accentColor = 'red' }: Props) {
  return (
    <button
      style={{ backgroundColor: `${accentColor}`, opacity: 0.8 }}
      onClick={onClick}
      className='border-none rounded-md py-2 px-8 text-white font-semibold leading-4'
    >
      {text}
    </button>
  );
}
