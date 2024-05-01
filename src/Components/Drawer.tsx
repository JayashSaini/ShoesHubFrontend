import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";

const Drawer: React.FC = () => {
  const drawerRef = useRef(null);
  useEffect(() => {
    gsap.to(drawerRef.current, {
      duration: 1,
      x: 0,
      ease: "sine.in",
    });
  }, []);
  return (
    <div
      ref={drawerRef}
      className="w-[100vw] h-[90vh]  top-0 left-0 bg-white translate-x-[-100vh]">
      <div>
        <ul>
          <div className="w-full text-[15px] px-5 py-3 font-medium border-b-2 border-b-gray-100">
            Home
          </div>
          <div className="w-full text-[15px] px-5 py-3 font-medium border-b-2 border-b-gray-100">
            New
          </div>
          <Accordion type="single" className="bg-white" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[15px] px-5">
                Men
              </AccordionTrigger>
              <AccordionContent className=" text-[14px] px-5">
                Sneakers
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Boot
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Boat Shoes
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Loafers
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Sandals
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Slip-ons
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" className="bg-white" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-[15px] px-5">
                Women
              </AccordionTrigger>
              <AccordionContent className=" text-[14px] px-5">
                Boots
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Comfort
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Heel
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Platforms
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Sandals
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Sneakers
              </AccordionContent>
              <AccordionContent className=" text-[14px] px-5">
                Water Shoes
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
