import React from "react";
import { ProductType } from "@/types/product";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiCall } from "@/utils";
import { TailSpin } from "react-loader-spinner";
import { ProductCard } from "@/Components";
import men from "@/assets/collectionMenBanner.jpg";
import men2 from "@/assets/collectionMenBanner2.jpg";
import women1 from "@/assets/collectionWomenBanner.jpg";
import women2 from "@/assets/collectionWomenBanner2.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@/types/state";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

gsap.registerPlugin(ScrollTrigger);

const Collection = () => {
  let { collectionTitle, collectionId } = useParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = React.useState("newest");
  const wishlistProducts = useSelector(
    (state: RootState) => state.wishlist.proudcts
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    ApiCall({
      url: `/api/v1/product//category/${collectionId}`,
      method: "GET",
      params: {
        limit: 10,
        page: 1,
        sortType,
      },
    })
      .then((response: any) => {
        const products = response.data.data.products;
        if (!isAuthenticated) {
          setProducts(products);
          setIsLoading(false);
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
          setIsLoading(false);
        }
      })
      .catch(() => {
        return <></>;
      });
  }, [collectionId, sortType]);

  function formatTitle(title: string) {
    return title
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const collectionRef = React.useRef(null);
  const productsRef = React.useRef(null);
  useEffect(() => {
    window.scroll(0, 0);
    gsap.to(collectionRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power3.out",
    });
    if (!isLoading) {
      gsap.to(productsRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [collectionId, isLoading]);

  return (
    <>
      <div>
        <div
          ref={collectionRef}
          className={`w-full opacity-0 md:h-80 custom-flex py-2 md:text-5xl  sm:text-2xl text-lg md:text-white text-black font-semibold main-heading-font  ${
            collectionTitle?.charAt(0) === "m"
              ? "collection-men-bg"
              : "collection-women-bg"
          }`}>
          {formatTitle(collectionTitle || "")}
        </div>
        <div className="p-2 px-5 bg-slate-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="text-sm">
                Sort & Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort & Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortType}
                onValueChange={setSortType}>
                <DropdownMenuRadioItem value="newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="lowToHigh">
                  Price-Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="highToLow">
                  Price-High to Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="relevence">
                  Relevence
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="aToz">
                  Product A to Z
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="zToa">
                  Product Z to A
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <div>
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
              <div
                ref={productsRef}
                className=" opacity-0 w-full grid grid-cols-2 md:grid-cols-4 px-5 md:py-10 py-5 gap-4">
                {products.map((product, index) => (
                  <React.Fragment key={product._id + Math.random() * 10}>
                    <div>
                      <ProductCard product={product} />
                    </div>
                    {(index + 1) % 4 === 0 && (
                      <div className="col-span-2 md:col-span-2">
                        <img
                          src={
                            collectionTitle?.charAt(0) === "m"
                              ? (index + 1) % 8 == 0
                                ? men
                                : men2
                              : (index + 1) % 8 == 0
                              ? women1
                              : women2
                          }
                          alt="Large Image"
                          className="w-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
