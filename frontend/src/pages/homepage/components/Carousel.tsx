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
          left: "2.5rem",
          bottom: "2rem",
          textAlign: "start",
        }}
      >
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <Slider {...sliderSettings} className="aspect-square max-h-[85vh] ml-10">
      {carouselItems.map((carouselItem, index) => (
        <CarouselItem key={index} {...carouselItem} />
      ))}
    </Slider>
  );
};
