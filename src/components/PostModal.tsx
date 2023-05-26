import { CloseIcon } from './ui/icons';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
export default function PostModal({ children, onClose }: Props) {
  return (
    <section
      className='fixed w-full h-full top-0 left-0 flex flex-col justify-center items-center z-50 bg-black bg-opacity-70'
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button className='fixed top-0 right-0 p-8 text-white' onClick={onClose}>
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
