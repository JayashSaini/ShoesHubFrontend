import React, { useState } from "react";
import { CartType } from "@/types/Cart";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartProduct: React.FC<CartType> = ({ product }) => {
  const naviagate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className=" max-w-[700px] w-auto flex border-[1px] rounded-lg border-gray-100 p-3">
        <div className="md:w-1/2 w-full flex ">
          <div className="overflow-hidden">
            <img
              src={hovered ? product.subImages[0].url : product.mainImage.url}
              alt={product.description}
              className="w-[150px] h-full cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => {
                naviagate(`/product/${product.name}/${product._id}`);
                window.location.reload();
              }}
            />
          </div>
          <div className="p2">
            <h2 className="sm:text-base text-sm">{product.name}</h2>
            <h2 className="sm:text-sm text-[12px] mb-2">
              {product.description}
            </h2>
            <h3 className="sm:text-sm md:hidden block text-[12px]">
              Rs. ${product.price}
            </h3>
            <h3 className="sm:text-sm text-[12px]">COLOR: {product.color}</h3>
            <h3 className="sm:text-sm text-[12px]">SIZE: {product.size}</h3>
            <h3 className="sm:text-sm text-[12px]">WIDTH: M</h3>
            <h3 className="sm:text-base text-sm underline mt-2">
              <button className="md:hidden flex items-center gap-5 bg-gray-50 p-2 rounded-sm border-[2px] border-gray-100">
                <FaMinus
                  className="text-gray-500 text-[8px]"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity((prev) => prev - 1);
                    }
                  }}
                />

                <span
                  className="text-gray-500 text-[12px] no-underline"
                  style={{ userSelect: "none" }}>
                  {quantity}
                </span>

                <FaPlus
                  className="text-gray-500 text-[8px]"
                  onClick={() => {
                    if (quantity < product.stock) {
                      setQuantity((prev) => prev + 1);
                    }
                  }}
                />
              </button>
              <a href="#">Remove</a>
            </h3>
          </div>
        </div>
        <div className="md:w-1/2 md:flex hidden  justify-around items-center">
          <p className="sm:text-sm text-[12px]">Rs. ${product.price}</p>
          <button className="flex items-center gap-5 bg-gray-50 p-2 rounded-sm border-[2px] border-gray-100">
            <FaMinus
              className="text-gray-500 text-[12px]"
              onClick={() => {
                if (quantity > 0) {
                  setQuantity((prev) => prev - 1);
                }
              }}
            />

            <span
              className="text-gray-500 text-sm"
              style={{ userSelect: "none" }}>
              {quantity}
            </span>

            <FaPlus
              className="text-gray-500 text-[12px]"
              onClick={() => {
                if (quantity < product.stock) {
                  setQuantity((prev) => prev + 1);
                }
              }}
            />
          </button>
          <p className="sm:text-sm text-[12px]">Rs. ${product.price}</p>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
