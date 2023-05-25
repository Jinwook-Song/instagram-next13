import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  desk: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 576, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
};

export default function ScrollableBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel containerClass='w-full flex gap-2' responsive={responsive}>
      {children}
    </Carousel>
  );
}
