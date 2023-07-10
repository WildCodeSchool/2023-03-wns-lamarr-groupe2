import { CarouselItemType } from "./CarouselItemType";

export default function CarouselItem({ title }: CarouselItemType) {
  console.log(title);

  return (
    <div className="h-[620px] bg-secondary-dark p-10">
      <h1>{title}</h1>
    </div>
  );
}
