import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/state.js";
import { Link } from "react-router-dom";
import { toggleHamburger } from "@/features/features";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Drawer: React.FC = () => {
  const navigate = useNavigate();

  const menCategory = useSelector(
    (state: RootState) => state.features.category.men
  );
  const womenCategory = useSelector(
    (state: RootState) => state.features.category.women
  );

  const dispatch = useDispatch();

  const drawerRef = useRef(null);
  useEffect(() => {
    gsap.to(drawerRef.current, {
      duration: 1,
      x: 0,
      ease: "sine.in",
    });
  }, []);
  const Hambuger = () => {
    dispatch(toggleHamburger());
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        Hambuger();
      }
    }

    handleResize(); // Call initially to set the initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div
      ref={drawerRef}
      className="w-[100vw] h-[90vh]  top-0 left-0 bg-white translate-x-[-100vh]">
      <div className="w-full h-full flex flex-col justify-between">
        <ul>
          <div className="w-full text-[15px] px-5 py-3 font-medium border-b-2 border-b-gray-100">
            <Link to="/" onClick={Hambuger}>
              Home
            </Link>
          </div>
          <div className="w-full text-[15px] px-5 py-3 font-medium border-b-2 border-b-gray-100">
            <Link to="/new" onClick={Hambuger}>
              New
            </Link>
          </div>
          <Accordion type="single" className="bg-white" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[15px] px-5">
                <Link
                  to="/p/collection/men's/662fd720288f5b59eb7d3917"
                  onClick={Hambuger}
                  className="underline">
                  Men
                </Link>
              </AccordionTrigger>
              {menCategory.map((category) => {
                return (
                  <AccordionContent
                    className=" text-[14px] px-5"
                    key={category._id}>
                    <Link
                      to={`/collection/men's-${category.name}/${category._id}`}
                      onClick={Hambuger}>
                      {" "}
                      {category.name}
                    </Link>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
          </Accordion>
          <Accordion type="single" className="bg-white" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[15px] px-5">
                <Link
                  to="/p/collection/women's/662fd9c4d2c102242565f2c2"
                  onClick={Hambuger}
                  className="underline">
                  Women
                </Link>
              </AccordionTrigger>
              {womenCategory.map((category) => {
                return (
                  <AccordionContent
                    className=" text-[14px] px-5"
                    key={category._id}>
                    <Link
                      to={`/collection/women's-${category.name}/${category._id}`}
                      onClick={Hambuger}>
                      {" "}
                      {category.name}
                    </Link>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
          </Accordion>
        </ul>
        <div className="w-full">
          <div
            onClick={() => {
              Hambuger();
              navigate("/login");
            }}
            className="w-full p-5  font-medium text-base border-t-[2px] border-gray-100 flex gap-4  items-center">
            <FaRegUser /> Account
          </div>
          <div
            onClick={() => {
              Hambuger();
              navigate("/wishlist");
            }}
            className="w-full p-5   text-base  font-medium border-t-[2px] border-gray-100 flex gap-4 items-center">
            <FaRegHeart /> Wishlist
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
