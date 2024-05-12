import React, { useEffect, useState, useRef } from "react";
import { ProductCardType } from "@/types/product";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RootState } from "@/types/state";
import { useSelector, useDispatch } from "react-redux";
import { ApiCall } from "@/utils";
import { setWishlist } from "@/features/wishlist";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Product: React.FC<ProductCardType> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const [isWishlist, setIsWishlist] = useState(product.wishlist);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();

  const toggleWishlist = async () => {
    setIsWishlist((prev) => !prev);
    const method = isWishlist ? "DELETE" : "POST";
    try {
      const response = await ApiCall({
        url: `/api/v1/wishlist/${product._id}`,
        method,
      });
      if (response.data) {
        dispatch(setWishlist(response.data.data.products));
      }
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  };
  const productRef = useRef(null);
  useEffect(() => {
    gsap.to(productRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: productRef.current,
        start: "top 60%", // Start animation when the top of the element is 80% in view
      },
    });
  });
  return (
    <>
      <div
        ref={productRef}
        className="min-w-[150px] opacity-0 h-auto mx-3 relative">
        <div className="w-full max-h-[450px] overflow-hidden flex justify-center items-center ">
          <img
            src={hovered ? product.subImages[0].url : product.mainImage.url}
            alt={product.description}
            className="w-full h-full cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              navigate(`/product/${product.name}/${product._id}`);
            }}
            loading="lazy"
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
        {isAuthenticated && (
          <div className="absolute top-4 right-4">
            {isWishlist ? (
              <FaHeart
                onClick={toggleWishlist}
                className="text-[18px] text-orange-300 cursor-pointer"
              />
            ) : (
              <FaRegHeart
                onClick={toggleWishlist}
                className="text-[18px] text-gray-700 cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
