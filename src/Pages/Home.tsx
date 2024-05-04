import { SliderProduct } from "@/Components";
import blockWomen from "@/assets/BLOCK-WOMEN.jpg";
import blockMen from "@/assets/BLOCK-MEN.jpg";
import { MdArrowRightAlt } from "react-icons/md";
const Home = () => {
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
        <SliderProduct title="Women's New Arrivals" />
        <SliderProduct title="Men's New Arrivals" />
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
                <MdArrowRightAlt className="text-[#fa2045] text-2xl" />
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
                <MdArrowRightAlt className="text-[#fa2045] text-2xl" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
