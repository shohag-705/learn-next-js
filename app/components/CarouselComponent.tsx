"use client";
import { Carousel } from "antd";
import CarouselItem from "./CarouselItem";

export default function CarouselComponent() {
  return (
    <div>
      {" "}
      <Carousel autoplay>
        <CarouselItem alt="carousel 1" src="/images/carousel1.webp" />
        <CarouselItem alt="carousel 2" src="/images/carousel2.webp" />
        <CarouselItem alt="carousel 3" src="/images/carousel3.webp" />
      </Carousel>
    </div>
  );
}
