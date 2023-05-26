import dynamic from 'next/dynamic';

// lazy loading
const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    ssr: false, // 서버에서 미리 렌더링 하지 않도록
  }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = 'hotpink' }: Props) {
  return <GridLoader color={color} />;
}
