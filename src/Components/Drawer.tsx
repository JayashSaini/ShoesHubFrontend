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

const Drawer: React.FC = () => {
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
      <div>
        <ul>
          <div className="w-full text-[15px] px-5 py-3 font-medium border-b-2 border-b-gray-100">
            <Link to="/" onClick={Hambuger}>
              Home
            </Link>
          </div>
          <div className="w-full text-[15px] px-5 py-3 font-medium border-b-2 border-b-gray-100">
            <Link to="collection/new" onClick={Hambuger}>
              New
            </Link>
          </div>
          <Accordion type="single" className="bg-white" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[15px] px-5">
                <Link
                  to="collection/men"
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
                      to={`/collection/men/${category._id}`}
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
                  to="collection/women"
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
                      to={`/collection/women/${category._id}`}
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
      </div>
    </div>
  );
};

export default Drawer;
