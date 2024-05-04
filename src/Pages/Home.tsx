import { SliderProduct } from "@/Components";
import blockWomen from "@/assets/BLOCK-WOMEN.jpg";
import blockMen from "@/assets/BLOCK-MEN.jpg";
import category1 from "@/assets/Collection-1.jpg";
import category2 from "@/assets/sidesection.jpg";
import category3 from "@/assets/Collection4.jpg";
import category4 from "@/assets/Collection3.jpg";
import { MdArrowRightAlt } from "react-icons/md";
import Slider from "react-slick";
const Home = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div>
        <section className="home-bg w-full h-[85vh] flex justify-center items-end py-24 px-3">
          <div className="hidden sm:block">
            <h2 className="text-white md:text-6xl sm:text-4xl text-5xl font-extrabold sm:text-center text-left text-shadow-lg custom-text-shadow ">
              Comfort Meets Style. Discover <br /> Your Perfect Pair Today.
            </h2>
          </div>
        </section>
      </div>
      <div>
        <SliderProduct
          title="Men's New Arrivals"
          categoryID="662fd7c3ef0b27b2064e5092"
        />
        <SliderProduct
          title="Women's New Arrivals"
          categoryID="6636597b2542298af701506c"
        />
      </div>
      <div className="custom-flex sm:flex-row flex-col md:gap-16 gap-8 md:px-24 px-10 py-10 ">
        <div className="sm:w-1/2  w-full h-auto">
          <div>
            <img src={blockWomen} alt="women" />
          </div>
          <div className="flex items-center justify-between p-2">
            <h2 className="sm:text-4xl text-2xl font-base">Women</h2>
            <a
              href="#"
              className="flex items-center gap-2 sm:text-sm text-xs group">
              Shop Now
              <div className="transition-transform duration-150 ease-in transform group-hover:translate-x-2">
                <MdArrowRightAlt className="text-[#f68c23] text-2xl" />
              </div>
            </a>
          </div>
        </div>
        <div className="sm:w-1/2  w-full  h-auto sm:mt-24 ">
          <div>
            <img src={blockMen} alt="women" className="w-full " />
          </div>
          <div className="flex items-center justify-between p-2">
            <h2 className="sm:text-4xl text-2xl font-base">Men</h2>
            <a
              href="#"
              className="flex items-center gap-2 sm:text-sm text-xs group">
              Shop Now
              <div className="transition-transform duration-150 ease-in transform group-hover:translate-x-2">
                <MdArrowRightAlt className="text-[#f68c23] text-2xl" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="md:px-16 px-10 py-10">
        <div className="sm:my-2 md:px-2 px-0">
          <p className="md:text-xl sm:text-base  font-normal ">
            SHOP BY CATEGORY
          </p>
          <h2 className="md:text-5xl sm:text-3xl text-xl font-base ">
            Featured Collections
          </h2>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            <div className=" p-4 w-auto relative h-auto ">
              <img
                src={category1}
                alt="women"
                className="min-w-[150px] cursor-pointer"
              />
              <a
                href="#"
                className="absolute bottom-9 left-10 z-10 sm:text-xl text-sm text-white  font-bold hover:scale-105 ">
                Shop Now!
              </a>
            </div>
            <div className=" p-4 w-auto relative h-auto ">
              <img
                src={category2}
                alt="women"
                className="min-w-[150px] cursor-pointer"
              />
              <a
                href="#"
                className="absolute bottom-9 left-10 z-10 sm:text-xl text-sm text-white  font-bold hover:scale-105 ">
                Shop Now!
              </a>
            </div>
            <div className=" p-4 w-auto relative h-auto ">
              <img
                src={category3}
                alt="women"
                className="min-w-[150px] cursor-pointer"
              />
              <a
                href="#"
                className="absolute bottom-9 left-10 z-10 sm:text-xl text-sm text-white  font-bold hover:scale-105 ">
                Shop Now!
              </a>
            </div>
            <div className=" p-4 w-auto relative h-auto ">
              <img
                src={category4}
                alt="women"
                className="min-w-[150px] cursor-pointer"
              />
              <a
                href="#"
                className="absolute bottom-9 left-10 z-10 sm:text-xl text-sm text-white  font-bold hover:scale-105 ">
                Shop Now!
              </a>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Home;
