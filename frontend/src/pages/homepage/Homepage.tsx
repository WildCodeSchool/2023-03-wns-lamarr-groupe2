import React from "react";
import { CarouselHome } from "./components/Carousel";
import { carouselItems } from "./components/CarouselData";

function Homepage() {
  return (
    <div className="h-screen w-screen flex items-center">
      {/* Carousel will be hidden on mobile phone */}
      <div className="hidden lg:block lg:w-7/12">
        <CarouselHome carouselItems={carouselItems} />
      </div>
    </div>
  );
}

export default Homepage;
