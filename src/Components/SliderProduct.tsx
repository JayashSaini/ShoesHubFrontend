import React from "react";
import Slider from "react-slick";
import Product from "./Product";

const SliderProduct: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
          Men's New Arrivals
        </h3>
      </div>
      <div className="slider-container relative">
        <Slider {...settings}>
          {/* Render the Product component within Slider */}
          <div>
            <Product />
          </div>
          <div>
            <Product />
          </div>
          <div>
            <Product />
          </div>
          <div>
            <Product />
          </div>
          <div>
            <Product />
          </div>
          <div>
            <Product />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SliderProduct;
