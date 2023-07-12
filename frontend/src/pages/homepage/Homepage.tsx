import ConnexionPage from "./Connexion/ConnexionPage";
import { useLocation } from "react-router-dom";
import InscriptionPage from "./Inscription/InscriptionPage";
import { carouselItems } from "./Carousel/CarouselData";
import { CarouselHome } from "./Carousel/Carousel";

const Homepage = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="flex w-screen items-center  ">
      {/* Carousel will be hidden on mobile phone */}
      <div className="h-screen hidden xl:flex w-full flew-grow  justify-center items-center">
        <CarouselHome carouselItems={carouselItems} />
      </div>
      {pathName !== "/register" ? <ConnexionPage /> : <InscriptionPage />}
    </div>
  );
};

export default Homepage;
