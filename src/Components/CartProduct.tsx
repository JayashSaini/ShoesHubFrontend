import React, { useEffect, useState, useRef } from "react";
import { CartType } from "@/types/Cart";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { gsap } from "gsap";
import { ApiCall } from "@/utils";
import { useDispatch } from "react-redux";
import { setCart } from "@/features/Cart";
import { toast } from "sonner";
import { Toaster } from "@/Components/ui/sonner";

const CartProduct: React.FC<CartType> = ({ product, quantity }) => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [ourquantity, setQuantity] = useState(quantity);
  const [hovered, setHovered] = useState(false);
  const [total, setTotal] = useState(quantity * product.price);

  const itemRef = useRef(null);
  useEffect(() => {
    gsap.to(itemRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      stagger: 0.5,
    });
  });

  useEffect(() => {
    (async () => {
      await ApiCall({
        url: `/api/v1/cart/item/${product._id}`,
        method: "POST",
        data: {
          quantity: ourquantity,
        },
      })
        .then((response) => {
          if (response.data) {
            dispatch(
              setCart({
                cart: [...response.data.data.items],
                totalPrice: response.data.data.cartTotal,
                discountedTotalPrice: response.data.data.discountedTotal,
              })
            );
          }
          if (response.error) {
            toast.error(response.error.data.message);
          }
        })
        .catch((error) => {
          console.log("cart error: " + error);
          dispatch(
            setCart({
              cart: [],
              totalPrice: 0,
              discountedTotalPrice: 0,
            })
          );
        });
    })();
  }, [ourquantity]);

  const itemRemoveHandler = async () => {
    await ApiCall({
      url: `/api/v1/cart/item/${product._id}`,
      method: "DELETE",
    })
      .then((response) => {
        if (response.data) {
          dispatch(
            setCart({
              cart: [...response.data.data.items],
              totalPrice: response.data.data.cartTotal,
              discountedTotalPrice: response.data.data.discountedTotal,
            })
          );
          toast.error("Item removed successfully");
        } else {
          toast.error("Somthing went wrong");
        }
      })
      .catch(() => {
        dispatch(
          setCart({
            cart: [],
            totalPrice: 0,
            discountedTotalPrice: 0,
          })
        );
      });
  };
  return (
    <>
      <div
        ref={itemRef}
        className=" opacity-0 sm:max-w-[800px] w-full flex border-[1px] rounded-lg border-gray-100 p-3 ">
        <div className="md:w-1/2 w-full flex gap-2 ">
          <div className="overflow-hidden">
            <img
              src={hovered ? product.subImages[0].url : product.mainImage.url}
              alt={product.description}
              className="w-[150px] h-full rounded-lg cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105"
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
              <p
                className="sm:text-base text-sm cursor-pointer"
                onClick={itemRemoveHandler}>
                Remove
              </p>
            </h3>
          </div>
        </div>
        <div className="md:w-1/2 md:flex hidden  justify-evenly items-center">
          <p className="sm:text-sm text-[12px]">Rs. ${product.price}</p>
          <button className="flex items-center gap-5 bg-gray-50 p-2 rounded-sm border-[2px] border-gray-100">
            <FaMinus
              className="text-gray-500 text-[12px]"
              onClick={() => {
                if (ourquantity > 1) {
                  setQuantity((prev) => prev - 1);
                  setTotal((prev) => prev - product.price);
                }
              }}
            />

            <span
              className="text-gray-500 text-sm"
              style={{ userSelect: "none" }}>
              {ourquantity}
            </span>

            <FaPlus
              className="text-gray-500 text-[12px]"
              onClick={() => {
                if (ourquantity < product.stock) {
                  setQuantity((prev) => prev + 1);
                  setTotal((prev) => prev + product.price);
                }
              }}
            />
          </button>
          <p className="sm:text-sm text-[12px]">Rs. ${total}</p>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default CartProduct;
