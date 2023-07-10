import React from "react";
import { CarouselHome } from "./components/Carousel";
import { carouselItems } from "./components/CarouselData";

function Homepage() {
  return (
    <div className="h-screen md:flex items-center">
      {/* Carousel will be hidden on mobile phone */}
      <div className="hidden md:block max-h-screen justify-center">
        <CarouselHome carouselItems={carouselItems} />
      </div>
    </div>
  );
}

export default Homepage;
