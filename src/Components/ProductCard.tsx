import React from "react";
import { ProductCardType } from "@/types/product";
const Product: React.FC<ProductCardType> = ({ product }) => {
  return (
    <>
      <div className="min-w-[150px] h-auto mx-4">
        <div className="w-full max-h-[450px] overflow-hidden flex justify-center items-center ">
          <img
            src={product.mainImage.url}
            alt={product.description}
            className="w-full h-full cursor-pointer duration-100 transition-all hover:scale-105"
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
