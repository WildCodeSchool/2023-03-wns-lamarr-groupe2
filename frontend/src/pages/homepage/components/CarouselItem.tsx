import { CarouselItemType } from "./CarouselItemType";

export default function CarouselItem({ title, content, id }: CarouselItemType) {
  const bgColor = () => {
    if (id === 0) {
      return "bg-primary-attention";
    }
    if (id === 1) {
      return "bg-primary-danger";
    }
    if (id === 2) {
      return "bg-primary-good";
    }
  };

  return (
    <div className={`h-[90vh] ${bgColor()} p-10`}>
      <h1 className="uppercase">{title}</h1>
      <p>{content}</p>
    </div>
  );
}
