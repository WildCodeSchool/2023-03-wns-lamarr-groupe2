// @ts-nocheck
import CarouselItem from "./CarouselItem";
import { CarouselItemType } from "./CarouselItemType";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../index.css";

type Props = {
  carouselItems: Array<CarouselItemType>;
};

export const CarouselHome = ({ carouselItems }: Props) => {
  //The followind sliderSettings is need to personalize the carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          left: "80px",
          bottom: "60px",
          textAlign: "start",
        }}
      >
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider
      {...sliderSettings}
      className="aspect-square h-[85vh]"
    >{/* max-h-[82vh] max-w-[56vw] */}
      {carouselItems.map((carouselItem, index) => (
        <CarouselItem key={index} {...carouselItem} />
      ))}
    </Slider>
  );
};
