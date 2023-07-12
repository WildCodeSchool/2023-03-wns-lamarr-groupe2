import ConnexionPage from "./Connexion/ConnexionPage";
import { useLocation } from "react-router-dom";
import InscriptionPage from "./Inscription/InscriptionPage";
import { carouselItems } from "./Carousel/CarouselData";
import { CarouselHome } from "./Carousel/Carousel";

const Homepage = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="screen justify-between lg:px-10 xl:hidden flex items-center">
      {/* Carousel will be hidden on mobile phone */}
      <div className="hidden lg:w-8/12  max-w-[56vw] lg:flex justify-center">
        <CarouselHome carouselItems={carouselItems} />
      </div>
      {pathName !== '/register' ? <ConnexionPage /> : <InscriptionPage />}
    </div>
  );
}

export default Homepage;


