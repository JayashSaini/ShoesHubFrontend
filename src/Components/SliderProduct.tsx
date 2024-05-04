import React, { useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { SliderProps } from "../types";
import { ApiCall } from "@/utils";
import { ProductType } from "@/types/product.ts";

const SliderProduct: React.FC<SliderProps> = ({ title, categoryID }) => {
  const [products, setProducts] = React.useState<any>([]);
  const autoPlaySpeed = categoryID === "662fd7c3ef0b27b2064e5092" ? 2500 : 3000;
  useEffect(() => {
    ApiCall({
      url: `/api/v1/product//category/${categoryID}`,
      method: "GET",
      params: {
        limit: 8,
        page: 1,
      },
    })
      .then((response) => {
        setProducts([...response.data.data.products]);
      })
      .catch((err) => {
        console.log("error", err);
        return <></>;
      });
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoPlaySpeed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: function (i: any) {
      return (
        <div
          style={{
            width: "50%", // Adjust the width of each slide to half the container width
            textAlign: "center",
          }}>
          {i + 1}
        </div>
      );
    },
  };
  return (
    <div className="w-full  px-5 my-10 overflow-hidden ">
      <div className="sm:my-10 my-3 ">
        <h3 className="md:text-5xl sm:text-4xl text-2xl font-normal ">
          {title}
        </h3>
      </div>
      <div className="slider-container relative">
        <Slider {...settings}>
          {/* Render the Product component within Slider */}
          {products.map((product: ProductType) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderProduct;
