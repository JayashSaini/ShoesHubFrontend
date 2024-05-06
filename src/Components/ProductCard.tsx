import React, { useState } from "react";
import { ProductCardType } from "@/types/product";
import { useNavigate } from "react-router-dom";

const Product: React.FC<ProductCardType> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const naviagate = useNavigate();

  return (
    <>
      <div className="min-w-[150px] h-auto mx-3">
        <div className="w-full max-h-[450px] overflow-hidden flex justify-center items-center ">
          <img
            src={hovered ? product.subImages[0].url : product.mainImage.url}
            alt={product.description}
            className="w-full h-full cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              naviagate(`/product/${product.name}/${product._id}`);
              window.location.reload();
            }}
          />
        </div>
        <div className="p-1">
          <div className="flex flex-wrap justify-between ">
            <h1 className="sm:text-base text-[12px] font-medium">
              {product.name}
            </h1>
            <p className="sm:text-base text-[10px]">RS. {product.price}</p>
          </div>
          <p className="sm:text-base text-[10px]">{product.description}</p>
        </div>
      </div>
    </>
  );
};

export default Product;
