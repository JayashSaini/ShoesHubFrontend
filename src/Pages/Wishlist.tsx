import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../Components";
import { useSelector } from "react-redux";
import { RootState } from "@/types/state";
import { useEffect } from "react";
import { ApiCall } from "@/utils";
import { ProductType } from "@/types/product";
import { TailSpin } from "react-loader-spinner";

const Wishlist = () => {
  const navigate = useNavigate();
  const productIds = useSelector((state: RootState) => state.wishlist.proudcts);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = productIds.map(async (productId) => {
          const response = await ApiCall({
            url: `/api/v1/product/${productId}`,
            method: "GET",
          });
          return {
            ...response.data.data,
            wishlist: true,
          };
        });

        // Wait for all product promises to resolve

        setProducts(await Promise.all(productPromises));
        setIsLoading(false);
        // Now you have all products, you can proceed with further processing
      } catch (error) {}
    };

    // Call the fetchProducts function
    fetchProducts();
  }, [productIds]);
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-auto   py-2 px-2 flex justify-start flex-col items-center">
      <div className="md:w-[80%] w-full ">
        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center items-start">
          <h4 className="text-sm font-base text-gray-500 sm:block hidden">
            Home / <span className="text-black">Wishlist</span>
          </h4>
          <div
            className="custom-flex sm:text-base text-sm font-normal text-black cursor-pointer gap-1 hover:gap-2 duration-100"
            onClick={goBack}>
            <IoIosArrowBack className="text-black" />
            Back to Previous Page
          </div>
        </div>
      </div>
      <div className="w-full text-center md:h-32 h-24 bg-orange-50 custom-flex mt-2">
        <h2 className="main-heading-font md:text-4xl text-xl text-black font-bold">
          Your Wishlist
        </h2>
      </div>
      {isLoading ? (
        <div className="h-80 custom-flex">
          <TailSpin
            visible={true}
            height="50"
            width="50"
            color="#f68c23"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 px-5 md:py-10 py-5 gap-4">
          {products.map((product) => (
            <React.Fragment key={product._id + Math.random() * 1000}>
              <div>
                <ProductCard product={product} />
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
