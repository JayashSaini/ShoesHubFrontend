import React from "react";
import product from "../assets/p1.jpg";
const Product: React.FC = () => {
  return (
    <>
      <div className="min-w-[150px] h-auto mx-4">
        <div className="w-full max-h-[450px] overflow-hidden flex justify-center items-center ">
          <img
            src={product}
            alt="product"
            className="w-full h-full cursor-pointer duration-100 transition-all hover:scale-105"
          />
        </div>
        <div className="p-1">
          <div className="flex flex-wrap justify-between ">
            <h1 className="sm:text-base text-[12px] font-medium">Addidas</h1>
            <p className="sm:text-base text-[10px]">RS. 12000</p>
          </div>
          <p className="sm:text-base text-[10px]">Maxi Taglio Shopper Bron</p>
        </div>
      </div>
    </>
  );
};

export default Product;
