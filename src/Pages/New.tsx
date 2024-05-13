import React, { useRef, useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import { ApiCall } from "@/utils";
import { TailSpin } from "react-loader-spinner";
import { ProductCard } from "@/Components";
import women1 from "@/assets/collectionWomenBanner.jpg";
import women2 from "@/assets/collectionWomenBanner2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { RootState } from "@/types/state";
import { Button } from "@/Components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"


gsap.registerPlugin(ScrollTrigger);

const New = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
   const [position, setPosition] = React.useState("newest")
  const newRef = useRef(null);
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.proudcts
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

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
        const products = response.data.data.products;
        if (!isAuthenticated) {
          setProducts((prev) => [...prev, ...products]);
          setIsLoading(false);
        } else {
          const updatedProducts = products.map((product: ProductType) => {
            const wishlist = wishlistProducts.find(
              (proudctId) => proudctId == product._id
            );
            if (wishlist) {
              return {
                ...product,
                wishlist: true,
              };
            } else {
              return {
                ...product,
                wishlis: false,
              };
            }
          });
          setProducts((prev) => [...prev, ...updatedProducts]);
          setIsLoading(false);
        }
      })
      .catch(() => {
        return <></>;
      });
  }, [page]);

  useEffect(() => {
    window.scroll(0, 0);
    gsap.to(newRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: newRef.current,
        start: "top 50%", // Start animation when the top of the element is 80% in view
      },
    });
  }, []);

  const filterHandler = (sortType:string) => {
    setPosition(sortType)
    console.log("sortTYpe is : ",sortType)
  }
  return (
    <>
      <div>
        <div
          ref={newRef}
          className={`w-full opacity-0 md:h-80 custom-flex py-2 md:text-5xl  sm:text-2xl collection-new-bg text-lg md:text-white text-black font-semibold main-heading-font
          `}>
          New In
        </div>
        <div className="p-2 px-16 bg-orange-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button  variant={"ghost"} >Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={ 
(e)=>{
  
filterHandler(e)
                }
                } >
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="lowtohigh">Price-Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="hightolow">Price-High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="relevence">Relevence</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="atoz">Product A to Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ztoa">Product Z to A</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 px-5 md:py-10 py-5 gap-4">
              {products.map((product, index) => (
                <React.Fragment key={product._id + Math.random() * 10}>
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
