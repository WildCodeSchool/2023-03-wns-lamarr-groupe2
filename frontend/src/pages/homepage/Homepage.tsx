import React from "react";
import { CarouselHome } from "./components/Carousel";

function Homepage() {
  const carouselItems = [
    {
      title: "Echoes of future",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi officiis odit ducimus et fugiat sit eaque quisquam sint quidem, commodi molestias praesentium aspernatur. Inventore nihil vel maiores perspiciatis autem provident!",
      image: null,
    },
    {
      title: "Concept",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi officiis odit ducimus et fugiat sit eaque quisquam sint quidem, commodi molestias praesentium aspernatur. Inventore nihil vel maiores perspiciatis autem provident!",
      image: null,
    },
    {
      title: "To be completed",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi officiis odit ducimus et fugiat sit eaque quisquam sint quidem, commodi molestias praesentium aspernatur. Inventore nihil vel maiores perspiciatis autem provident!",
      image: null,
    },
  ];
  return (
    <div>
      <CarouselHome carouselItems={carouselItems} />
    </div>
  );
}

export default Homepage;
