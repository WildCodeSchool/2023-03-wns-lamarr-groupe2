import { FC, useState } from "react";
import { CarouselItemType } from "./CarouselItemType";
import CarouselItem from "./CarouselItem";
import styles from "./Carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

type Props = {
  carouselItems: Array<CarouselItemType>;
};

export const CarouselHome = ({ carouselItems }: Props) => {
  return (
    <Swiper
      //   pagination={true}
      //   modules={[Pagination]}
      className={`${styles.swiper}  ${styles.swiperSlide}`}
    >
      <ul>
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index}>
            <CarouselItem {...item} />
          </SwiperSlide>
        ))}
      </ul>
    </Swiper>
  );
};
