// @ts-nocheck
import CarouselItem from "./CarouselItem";
import { CarouselItemType } from "./CarouselItemType";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  carouselItems: Array<CarouselItemType>;
};

export const CarouselHome = ({ carouselItems }: Props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div
        style={{
          position: "absolute",
          left: "12px",
          bottom: "10px",
          alignItems: "start",
        }}
      >
        <ul style={{ margin: "0" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <Slider
      {...settings}
      className="aspect-square max-h-[620px] m-10 bg-tertiary-dark"
    >
      {carouselItems.map((carouselItem, index) => (
        <CarouselItem key={index} {...carouselItem} />
      ))}
    </Slider>
  );
};
