import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartProduct } from "@/Components";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { CartType } from "@/types/cart";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/types/state";
import { toast } from "sonner";
import { ApiCall } from "@/utils";
import { setCart } from "@/features/cart";
import { MdArrowRightAlt } from "react-icons/md";
import { setProfile } from "@/features/profile";
import { PrimaryButton, Input } from "@/Components";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/Components/ui/accordion";

const Checkout = () => {
    const navigate = useNavigate();
    const [updateFirstName, setUpdateFirstName] = useState("");
    const [updateLastName, setUpdateLastName] = useState("");
    const [updatePhone, setUpdatePhone] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [address1,setAddress1] = useState("");
    const [address2,setAddress2] = useState("");
    const [city,setCity] = useState("");
    const [state,setState] = useState("");
    const [zip,setZip] = useState("");
    const [country,setCountry] = useState("");
    const [cashOnDelivery,setCashOnDelivery] = useState(true);


    const { firstName, lastName, phone, email } = useSelector(
        (state: RootState) => state.profile
      );
  
  const [discountCode, setDiscountCode] = useState("");
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
  }, [cartCount]);

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

  const handleSave = async () => {
    
    let data = {};
    if (updateFirstName && updateFirstName.trim() !== "") {
      if (updateFirstName.length < 3) {
        toast.error("First name must be at least 3 characters long");
        return;
      }
      if (!/^[a-zA-Z ]+$/.test(updateFirstName)) {
        toast.error("First name must contain only letters and spaces");
        return;
      }
      data = { ...data, firstName: updateFirstName };
      setUpdateFirstName("");
    }

    if (updateLastName && updateLastName.trim() !== "") {
      if (updateLastName.length < 3) {
        toast.error("Last name must be at least 3 characters long");
        return;
      }
      if (!/^[a-zA-Z ]+$/.test(updateLastName)) {
        toast.error("Last name must contain only letters and spaces");
        return;
      }
      data = { ...data, lastName: updateLastName };
      setUpdateLastName("");
    }

    if (updatePhone && updatePhone.trim() !== "") {
      if (updatePhone.length !== 10 || !/^\d+$/.test(updatePhone)) {
        toast.error("Phone number must be 10 digits long");
        return;
      }
      data = { ...data, phoneNumber: updatePhone };
      setUpdatePhone("");
    }

    if (updateEmail && updateEmail.trim() !== "") {
      data = { ...data, email: updateEmail };
      setUpdateEmail("");
    }
    if (Object.keys(data).length > 0) {
      ApiCall({
        url: "/api/v1/profile",
        method: "PATCH",
        data,
      })
        .then((response: any) => {
          if (response.data) {
            const { firstName, lastName, email, phoneNumber } =
              response.data.data;

            dispatch(setProfile({ firstName, lastName, email, phoneNumber }));
            toast.success("Profile update successfully");
            return;
          }
          if (response.error) {
            toast.error(response.error.message);
            return;
          }
        })
        .catch(() => {
          toast.error("Error while updating the profile");
        });
    }
  };

  const OrderHandler = (e:any) => {
    e.preventDefault();
    setAddress1("")
    setAddress2("")
    setCity("")
    setCountry("")
    setState("")
    setZip("")
    toast.success("Order placed successfully")
  }
  return (
    <>
   { cartCount > 0 ?(<div className="w-full h-auto   py-2 px-2 flex justify-start flex-col items-center">
      <div className="md:w-[80%] w-full ">
        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center items-start">
          <h4 className="text-sm font-base text-gray-500 sm:block hidden">
            Home / <span className="text-black">Checkout</span>
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
          Checkout
        </h2>
      </div>
      <Accordion type="single" className="bg-white md:hidden block w-full  " collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[15px] px-5">
                Show our cart
              </AccordionTrigger>
            <AccordionContent>
            <div className="sm:w-[90%] w-full py-5 ">
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
                className="w-full md:px-10 px-1 md:py-6 py-3  ">
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
                </div>
              </div>
        </div>
            </AccordionContent>
            </AccordionItem>
    </Accordion>
      <div className="flex w-full">
     
        <div className="md:w-1/2 w-full custom-flex items-start">
            <div className="md:max-w-[700px] w-full h-auto p-5">
                <h2 className="md:text-2xl text-lg text-orange-500 -mb-2">Personal Info.</h2>
                <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  await handleSave();
                }}>
                <div className="flex gap-2">
                <Input
                  label="First Name"
                  onChange={(e) => {
                    setUpdateFirstName(e.target.value);
                  }}
                  type="text"
                  placeholder={firstName}
                  value={updateFirstName}
                  isRequired={false}
                />
                <Input
                  label="Last Name"
                  onChange={(e) => {
                    setUpdateLastName(e.target.value);
                  }}
                  type="text"
                  placeholder={lastName}
                  value={updateLastName}
                  isRequired={false}
                />
                </div>
                <Input
                  label="Phone Number"
                  onChange={(e) => {
                    setUpdatePhone(e.target.value);
                  }}
                  type="number"
                  placeholder={String(phone)}
                  value={updatePhone}
                  isRequired={false}
                />
                <Input
                  label="Email"
                  onChange={(e) => {
                    setUpdateEmail(e.target.value);
                  }}
                  type="email"
                  placeholder={email}
                  value={updateEmail}
                  isRequired={false}
                />
                <div className="md:mt-3">
                  <button className="text-center py-2 md:px-5 px-3 border-[1px] border-black md:text-sm text-[10px] rounded-sm hover:bg-black hover:text-white duration-150 ease-in-out" >
                    Update Information
                  </button>
                </div>
                </form>
                <h2 className="md:text-2xl text-lg text-orange-500 mt-5 -mb-2">Shipping Address</h2>
                <form onSubmit={OrderHandler}>
                <Input
                  label="Address 1"
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  type="text"
                  placeholder={"Address Line 1"}
                  value={address1}
                />
                <Input
                  label="Address 2"
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  type="text"
                  placeholder={"Address Line 2"}
                  value={address2}
                  isRequired={false}
                />
               
                <div className="flex gap-2">
                <Input
                  label="City"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  placeholder={"Enter your city"}
                  type="text"
                  value={city}
                />
                <Input
                  label="State"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  placeholder={"Enter your state"}
                  type="text"
                  value={state}
                />
                  </div>
                <Input
                  label="PIN CODE"
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  placeholder={"Enter your zip code"}
                  type="number"
                  value={zip}
                />
                <Input
                  label="Country"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  placeholder={"Enter your country"}
                  type="text"
                  value={country}
                />
                <div className="flex items-center gap-1">
                <input type="checkbox" checked={cashOnDelivery} onChange={()=>{
                    setCashOnDelivery(true);
                }}  className=" w-[15px] h-[15px] border border-gray-300 bg-black   rounded-sm focus:outline-none focus:border-black-300 transition duration-150 ease-in-out"/>
                <label className="text-[12px]">Cash On Delivery </label>
                </div>
                <div className=" w-full mt-5">
                    <PrimaryButton text="Order Placed"/>
                </div>
                </form>
            </div>            
        </div>
        <div className="w-1/2 md:flex hidden  relative">
        <div className="sm:w-[90%] w-full py-5 ">
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
                </div>
              </div>
        </div>
        </div>
        
      </div>
      
      </div> ): ( (
          <div ref={cartRef} className=" opacity-0 w-full h-[60vh] custom-flex">
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="md:text-4xl text-xl main-heading-font">
                Cart is Empty
              </h3>
              <button
                onClick={() => {
                  navigate("/new");
                }}
                className="py-2 px-3 border-[2px] border-black text-sm rounded-sm hover:bg-black hover:text-white duration-200 ease-in focus:outline-none">
                Continue Shopping
              </button>
            </div>
          </div>
        ))}

    </>
  )
}

export default Checkout;