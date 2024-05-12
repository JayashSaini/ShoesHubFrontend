import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { ProductType } from "@/types/product";
import { gsap } from "gsap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { SliderProduct } from "@/Components";
import { ApiCall } from "@/utils";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
import { Toaster } from "@/Components/ui/sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/features/cart";

const Product: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const subImagesContainerRef = useRef(null);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [size, setSize] = useState(0);

  const [product, setProduct] = useState<ProductType>({
    _id: "",
    category: "",
    description: "",
    mainImage: {
      url: "",
      public_id: "",
      _id: "",
    },
    color: "",
    size: [],
    name: "",
    owner: "",
    price: 0,
    stock: 0,
    subImages: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [mainImage, setMainImage] = useState(product.mainImage); // State to store the main image
  const [subImages, setSubImages] = useState([...product.subImages]);

  const navigate = useNavigate();
  const productRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      productRef.current,
      {
        opacity: 0,
      },
      { opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 } // End with opacity 1 after a delay of 0.5 seconds
    );
    ApiCall({
      url: `/api/v1/product/${productId}`,
      method: "GET",
    })
      .then((res) => {
        setProduct(res.data.data);
        setSize(res.data.data.size[0]);
        setSubImages([...res.data.data.subImages]);
        setMainImage(res.data.data.mainImage);
      })
      .catch(() => {
        navigate("/404");
      });
  }, [productId]);

  const handleSubImageClick = (image: any) => {
    // Slide animation

    setMainImage(image); // Set the clicked sub image as the main image
    gsap.fromTo(".main-image", { x: -100 }, { x: 0, duration: 0.5 });
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const AddToCartHandler = async () => {
    setIsLoading(true);
    await ApiCall({
      url: `/api/v1/cart/item/${productId}`,
      method: "POST",
      data: {
        quantity: quantity,
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.data) {
          dispatch(
            setCart({
              cart: [...response.data.data.items],
              totalPrice: response.data.data.cartTotal,
              discountedTotalPrice: response.data.data.discountedTotal,
            })
          );
          toast("Product added to cart successfully ", {
            description: `${product.name}, ${product.description}, ${product.price}`,
            action: {
              label: "Go to Cart",
              onClick: () => {
                navigate("/cart");
              },
            },
          });
        }
        if (response.error) {
          setIsLoading(false);
          toast("Before adding the product to your cart, please login.", {
            action: {
              label: "Login",
              onClick: () => {
                navigate("/login");
              },
            },
          });
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(`${product.name} has already been in cart`);
      });
  };

  return (
    <>
      <div
        ref={productRef}
        className="w-full min-h-[100vh]  relative md:px-10 sm:px-6 px-4 py-4">
        <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center items-start">
          <h4 className="text-sm font-base text-gray-500">
            Home / <span className="text-black">{product.description}</span>
          </h4>
          <div
            className="custom-flex sm:text-base text-sm font-normal text-black cursor-pointer gap-1 hover:gap-2 duration-100"
            onClick={goBack}>
            <IoIosArrowBack className="text-black" />
            Back to Previous Page
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row   my-5 gap-3 ">
          {/* Product Images */}
          <div className="md:w-[50%] w-full flex gap-2 overflow-hidden">
            <div
              ref={subImagesContainerRef}
              className="flex flex-col w-1/5 gap-1">
              {subImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Sub Image ${index + 1}`}
                  className="w-full mb-2 cursor-pointer"
                  style={{ opacity: mainImage === image ? 1 : 0.7 }} // Change opacity based on active image
                  onClick={() => handleSubImageClick(image)}
                  loading="lazy"
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="w-4/5 overflow-hidden">
              <img
                src={mainImage.url}
                alt="Main Image"
                className="w-full h-full main-image "
                loading="lazy"
              />
            </div>
          </div>

          {/* Product Details  */}
          <div className="md:px-5 py-1 sm:w-[50%] w-full">
            <h3 className="sm:text-lg text-sm">{product.name}</h3>
            <h2 className="sm:text-xl text-lg font-bold">
              {product.description}
            </h2>
            <p className="sm:text-[16px] text-[12px] my-2 text-sm">
              Rs. {product.price}
            </p>
            <div className="grid grid-cols-2 gap-4 my-5">
              <ul>
                <li className="flex items-center gap-1 ">
                  <span className="bullet sm:text-[16px] text-[12px] text-gray-400 font-normal">
                    •
                  </span>
                  <span className="mr-2 sm:text-[16px] text-[12px] text-gray-400 font-normal">
                    Artical:
                  </span>
                </li>
                <li className="flex items-center gap-1 ">
                  <span className="bullet sm:text-[16px] text-[12px] text-gray-400 font-normal">
                    •
                  </span>
                  <span className="mr-2 sm:text-[16px] text-[12px] text-gray-400 font-normal">
                    Material:
                  </span>
                </li>
                <li className="flex items-center gap-1 ">
                  <span className="bullet sm:text-[16px] text-[12px] text-gray-400 font-normal">
                    •
                  </span>
                  <span className="mr-2 sm:text-[16px] text-[12px] text-gray-400 font-normal">
                    Vendor Number:
                  </span>
                </li>
              </ul>
              <ul>
                <li className="sm:text-[16px] text-[12px] text-gray-400 font-normal">
                  73617361
                </li>
                <li className="sm:text-[16px] text-[12px] text-gray-400 font-normal">
                  Fabric
                </li>
                <li className="sm:text-[16px] text-[12px] text-gray-400 font-normal">
                  9079830785
                </li>
              </ul>
            </div>
            <div>
              <h3 className="sm:text-base text-sm">
                <span className="font-bold">Color </span>
                {product.color.charAt(0).toUpperCase() + product.color.slice(1)}
              </h3>
              <button className="border-[1px] border-black py-2 px-3 text-base my-3">
                {product.color.charAt(0).toUpperCase() + product.color.slice(1)}
              </button>
            </div>
            <div>
              <h3 className="sm:text-base text-sm">
                <span className="font-bold">Size </span>
                {size}
              </h3>
              <p className="text-base font-bold mt-3">Alomost Sold Out</p>
              {product.size.map((productSize, index) => (
                <button
                  key={index}
                  onClick={() => setSize(productSize)}
                  className={`p-3 border-[1px] border-gray-600 m-1 rounded-sm text-base ${
                    productSize === size ? "bg-orange-100" : "" // Apply 'bg-cream' class if size matches selectedSize
                  }`}>
                  {productSize}
                </button>
              ))}
            </div>
            <div>
              <h3 className="sm:text-base text-sm mt-3">
                <span className="font-bold">Width </span>M
              </h3>
              <button
                className="p-3 border-[1px] border-gray-600 rounded-sm m-1 text-base bg-orange-100 "
                style={{ userSelect: "none" }}>
                M
              </button>
            </div>
            <div className="w-full custom-flex gap-2 mt-3">
              <button className="flex items-center gap-5 bg-gray-50 p-2 rounded-sm border-[2px] border-gray-100">
                <FaMinus
                  className="text-gray-500 text-base"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity((prev) => prev - 1);
                    }
                  }}
                />

                <span
                  className="text-gray-500 sm:text-lg text-base"
                  style={{ userSelect: "none" }}>
                  {quantity}
                </span>

                <FaPlus
                  className="text-gray-500 text-base"
                  onClick={() => {
                    if (quantity < product.stock) {
                      setQuantity((prev) => prev + 1);
                    }
                  }}
                />
              </button>
              <div className="w-full">
                <button
                  onClick={AddToCartHandler}
                  className="w-full custom-flex bg-[#f68c23] hover:bg-black focus:bg-black py-2 text-sm text-white duration-150 ease-in gap-1 hover:gap-2"
                  style={{ userSelect: "none" }} // Prevent text selection
                >
                  {isLoading ? (
                    <TailSpin
                      visible={true}
                      height="20"
                      width="20"
                      color="#ffffff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <div className="flex gap-2">
                      <MdOutlineShoppingCart />
                      Add to cart
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {product.category && (
            <SliderProduct
              categoryID={product.category}
              title="You may also like "
            />
          )}
        </div>
        <Toaster position="top-center" className="bg-black" />
      </div>
    </>
  );
};

export default Product;
