import React from "react";
import { CarouselHome } from "./components/Carousel";
import { carouselItems } from "./components/CarouselData";
import ConnexionPage from "./Connexion/ConnexionPage";

function Homepage() {
  console.log(window.innerWidth)
  return (
    <div className="screen justify-between lg:px-10 xl:hidden flex items-center">
      {/* Carousel will be hidden on mobile phone */}
      <div className="hidden lg:w-8/12  max-w-[56vw] lg:flex justify-center">
        <CarouselHome carouselItems={carouselItems} />
      </div>
      <ConnexionPage />
    </div>
  );
}

export default Homepage;
