import React from "react";
import { ProductType } from "@/types/product";
import { useState, useEffect } from "react";
import { ApiCall } from "@/utils";
import { TailSpin } from "react-loader-spinner";
import { ProductCard } from "@/Components";
import women1 from "@/assets/collectionWomenBanner.jpg";
import women2 from "@/assets/collectionWomenBanner2.jpg";

const New = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    ApiCall({
      url: `/api/v1/product/`,
      method: "GET",
      params: {
        limit: 18,
        page: page,
      },
    })
      .then((response: any) => {
        setProducts((prev) => {
          return [...prev, ...response.data.data.products];
        });
        setIsLoading(false);
      })
      .catch(() => {
        return <></>;
      });
  }, [page]);

  return (
    <>
      <div>
        <div
          className={`w-full md:h-80 custom-flex py-2 md:text-5xl  sm:text-2xl collection-new-bg text-lg md:text-white text-black font-semibold main-heading-font
          `}>
          New In
        </div>
        <div>
          <div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 px-5 md:py-10 py-5 gap-4">
              {products.map((product, index) => (
                <React.Fragment key={product._id}>
                  <div>
                    <ProductCard product={product} />
                  </div>
                  {(index + 1) % 8 === 0 && (
                    <div className="col-span-2 md:col-span-2">
                      <img
                        src={(index + 1) % 16 == 0 ? women1 : women2}
                        alt="Large Image"
                        className="w-full"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            {isLoading && (
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
            )}
            {!isLoading && (
              <div className="text-center mt-4">
                <button
                  className="border-[1px] border-black hover:bg-black hover:text-white py-2 px-3 text-base my-3 duration-200 ease-in"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}>
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
