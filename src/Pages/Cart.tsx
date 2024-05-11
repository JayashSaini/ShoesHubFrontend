import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartProduct } from "@/Components";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/Components";
import { useRef } from "react";
import { CartType } from "@/types/cart";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/types/state";
import { toast } from "sonner";
import { Toaster } from "@/Components/ui/sonner";
import { ApiCall } from "@/utils";
import { setCart } from "@/features/cart";
import { MdArrowRightAlt } from "react-icons/md";

const Cart = () => {
  const [discountCode, setDiscountCode] = useState("");
  const navigate = useNavigate();
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const products: CartType[] = useSelector(
    (state: RootState) => state.cart.cart || []
  );
  const cartTotalPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  const discountedTotalPrice = useSelector(
    (state: RootState) => state.cart.discountedTotalPrice
  );
  const cartCount = useSelector((state: RootState) => state.cart.cart.length);

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    window.scroll(0, 0);
    gsap.to(cartRef.current, {
      opacity: 1,
      duration: 2,
      delay: 1,
      ease: "power3.out",
    });
  }, []);

  const discountHandler = () => {
    if (discountCode.length < 4) {
      toast.error("Please enter a valid discount code");
      return;
    }
    ApiCall({
      url: "/api/v1/coupon/c/apply",
      method: "POST",
      data: {
        couponCode: discountCode,
      },
    })
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
          dispatch(
            setCart({
              cart: [...response.data.data.items],
              totalPrice: response.data.data.cartTotal,
              discountedTotalPrice: response.data.data.discountedTotal,
            })
          );
          setDiscountCode("");
        } else {
          if (response.error) {
            toast.error(response.error.data.message);
          }
        }
      })
      .catch(() => {
        toast.error("Please enter a valid discount code");
      });
  };
  return (
    <>
      <div className="w-full h-auto   py-2 px-2 flex justify-start flex-col items-center">
        <div className="md:w-[80%] w-full ">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center items-start">
            <h4 className="text-sm font-base text-gray-500 sm:block hidden">
              Home / <span className="text-black">Cart</span>
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
            Your Cart
          </h2>
        </div>
        {cartCount > 0 ? (
          products && (
            <div className="sm:w-[65%] w-full py-5">
              <div className="w-full custom-flex flex-col gap-2">
                <div className=" sm:max-w-[700px] w-full md:flex hidden">
                  <div className="w-1/2">
                    <h3 className="text-sm text-gray-600">Product</h3>
                  </div>
                  <div className=" w-1/2 flex justify-evenly">
                    <h3 className="text-sm text-gray-600">Price</h3>
                    <h3 className="text-sm text-gray-600">Quantity</h3>
                    <h3 className="text-sm text-gray-600">Total</h3>
                  </div>
                </div>
                {products.map((item) => {
                  return (
                    <div key={item.product._id} className="w-full">
                      <CartProduct
                        product={item.product}
                        quantity={item.quantity}
                      />
                    </div>
                  );
                })}
              </div>
              <div
                ref={cartRef}
                className="w-full md:px-10 px-1 md:py-6 py-3  opacity-0 ">
                <div className="px-1 my-2">
                  <label
                    htmlFor="discount"
                    className="block md:text-xl text-sm">
                    Discount Code
                  </label>
                  <div className="flex gap-2 items-center">
                    {" "}
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value.toUpperCase());
                      }}
                      className="w-[300px] my-1  border-gray-200 border-[2px] rounded-sm font-medium px-2 py-1 focus:outline-orange-300 text-base"
                    />
                    <button onClick={discountHandler}>
                      <MdArrowRightAlt className="text-[#f68c23] sm:text-4xl text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="px-1">
                  <div className="flex justify-between items-center">
                    <h3 className="sm:text-base text-[12px]">Subtotal</h3>
                    <h3 className="sm:text-base text-[12px]">
                      RS. <span>{cartTotalPrice}</span>
                    </h3>
                  </div>
                  <p className="sm:text-base text-[12px]">
                    Taxes and shipping calculated at checkout
                  </p>
                  <div className="flex justify-between items-center">
                    <h3 className="sm:text-xl text-sm main-heading-font">
                      Total
                    </h3>
                    <h3 className="sm:text-xl text-sm main-heading-font">
                      RS. <span>{discountedTotalPrice}</span>
                    </h3>
                  </div>
                  <div className="mt-2">
                    <PrimaryButton text="Secure Checkout" />
                  </div>
                </div>
              </div>
              <Toaster position="top-center" className="bg-black" />
            </div>
          )
        ) : (
          <div className="w-full h-[60vh] custom-flex">
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="md:text-4xl text-xl main-heading-font">
                Cart is Empty
              </h3>
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="py-2 px-3 border-[2px] border-black text-sm rounded-sm hover:bg-black hover:text-white duration-200 ease-in focus:outline-none">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
