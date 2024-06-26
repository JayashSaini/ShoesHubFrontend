import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { SliderProps } from "../types";
import { ApiCall } from "@/utils";
import { ProductType } from "@/types/product.ts";
import { Skeleton } from "@/Components/ui/skeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "@/types/state";
gsap.registerPlugin(ScrollTrigger);

const SliderProduct: React.FC<SliderProps> = ({ title, categoryID }) => {
  const [products, setProducts] = React.useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.proudcts
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const autoPlaySpeed = categoryID === "662fd7c3ef0b27b2064e5092" ? 2500 : 3000;
  useEffect(() => {
    ApiCall({
      url: `/api/v1/product//category/${categoryID}`,
      method: "GET",
      params: {
        limit: 8,
        page: 1,
        sortType: "relevance",
      },
    })
      .then((response: any) => {
        const products = response.data.data.products;
        if (!isAuthenticated) {
          setProducts(products);
        } else {
          const updatedProducts = products.map((product: ProductType) => {
            const wishlist = Array.isArray(wishlistProducts)
              ? (wishlistProducts as string[]).includes(product._id)
              : (wishlistProducts as Set<string>).has(product._id);
            return {
              ...product,
              wishlist,
            };
          });
          setProducts(updatedProducts);
        }
        setIsLoading(false);
      })
      .catch(() => {
        return <></>;
      });
  }, []);

  const productSliderRef = useRef(null);
  useEffect(() => {
    const productSliderElement = productSliderRef.current; // Access the current DOM element

    if (!productSliderElement) return;
    gsap.to(
      productSliderElement,

      {
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productSliderElement,
          start: "top 70%", // Start animation when the top of the element is 80% in view
        },
      }
    );
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
    prevArrow: <></>, // Hide the default previous arrow button
    nextArrow: <></>,
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
    <div
      ref={productSliderRef}
      className="w-full  sm:px-5 px-1 opacity-0 my-10 overflow-hidden ">
      <div className="sm:my-10 my-3 ">
        <h3 className=" sm:text-4xl text-2xl font-normal main-heading-font px-4">
          {title}
        </h3>
      </div>
      <div className="slider-container relative">
        {isLoading ? (
          <div className="flex gap-6">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] sm:w-[250px] w-[200px]  rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
              </div>
            </div>
            <div className="flex hidden md:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex hidden sm:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] sm:w-[250px] w-[200px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {products.length > 4 ? (
              <Slider {...settings}>
                {/* Render the Product component within Slider */}
                {products.map((product: ProductType) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-2">
                {products.map((product: ProductType) => (
                  <div key={product._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderProduct;
