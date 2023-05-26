import reactDom from 'react-dom';
type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // only browser
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('modal') as Element;
  return reactDom.createPortal(children, node);
}
