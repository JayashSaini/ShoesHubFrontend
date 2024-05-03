import { SliderProduct } from "@/Components";
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
        <SliderProduct />
      </div>
    </>
  );
};

export default Home;
