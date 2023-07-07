import { CarouselItemType } from "./CarouselItemType";

export default function CarouselItem({ title }: CarouselItemType) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
