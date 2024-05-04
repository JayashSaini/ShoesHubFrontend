import React, { useState } from "react";
import Logo from "../assets/favicon1.svg";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toggleHamburger } from "../features/features.js";
import { RootState } from "../types/state.js";
import Drawer from "./Drawer.js";
import men1 from "../assets/men1.jpg";

const Header: React.FC = () => {
  const hamburger = useSelector((state: RootState) => state.features.hamburger);
  const [showCategoryContainer, setShowCategoryContainer] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = (category: string) => {
    // category to be called via api and get it's API
    console.log("category to be called" + category);
    setShowCategoryContainer(true);
  };

  const handleMouseLeave = () => {
    setShowCategoryContainer(false);
  };

  const toggleHamburgerHander = () => {
    dispatch(toggleHamburger()); // Dispatch the action
  };

  return (
    <>
      <div
        className="w-full h-auto fixed z-40 "
        onMouseLeave={handleMouseLeave}>
        <div className="w-full h-auto bg-white  md:px-16 px-4 py-2 flex justify-between items-center border-b-2 border-gray-200 ">
          <div>
            <img
              src={Logo}
              alt="Shoes Hub"
              loading="lazy"
              className="md:w-[70px] w-[55px]"
            />
          </div>
          <div className="hidden md:block">
            <ul className="flex justify-evenly">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm px-3 text-[#f68c23]"
                      : "text-sm px-3 hover:text-[#f68c23]"
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/new"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm px-3 text-[#f68c23]"
                      : "text-sm px-3 hover:text-[#f68c23]"
                  }>
                  New
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/men"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm px-3 text-[#f68c23]"
                      : "text-sm px-3 hover:text-[#f68c23]"
                  }
                  onMouseEnter={() => {
                    handleMouseEnter("men");
                  }}>
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/women"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm px-3 text-[#f68c23]"
                      : "text-sm px-3 hover:text-[#f68c23]"
                  }
                  onMouseEnter={() => {
                    handleMouseEnter("women");
                  }}>
                  Women
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div className="hidden md:block">
              <ul className="flex justify-evenly">
                <li className="px-2">
                  <IoSearch className="text-[18px]   cursor-pointer hover:scale-105" />
                </li>
                <li className="px-2">
                  <FaRegUser className="text-[18px]   cursor-pointer hover:scale-105" />
                </li>
                <li className="px-2">
                  <MdOutlineShoppingCart className="text-[18px]   cursor-pointer hover:scale-105" />
                </li>
                <li className="px-2">
                  <FaRegHeart className="text-[18px]   cursor-pointer hover:scale-105" />
                </li>
              </ul>
            </div>
            <div className="block md:hidden flex gap-2">
              {!hamburger && (
                <IoSearch className="text-[23px]   cursor-pointer hover:scale-105" />
              )}
              {hamburger ? (
                <RxCross1
                  onClick={toggleHamburgerHander}
                  className="text-[25px]   cursor-pointer hover:scale-105"
                />
              ) : (
                <RxHamburgerMenu
                  onClick={toggleHamburgerHander}
                  className="text-[25px]   cursor-pointer hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
        {showCategoryContainer && (
          <div className="w-full min-h-[300px] bg-white py-6 px-8 flex justify-between">
            <div className="px-5 w-1/2">
              <h2 className="text-[#f68c23] roboto-bold sm:text-3xl text-2xl text-left mb-8 ">
                Men Shoes
              </h2>
              <ul className="grid grid-cols-2 gap-x-20 gap-y-4">
                <li className="text-base hover:text-[#f68c23]">
                  <a href="#"> Boots</a>
                </li>
                <li className="text-base hover:text-[#f68c23]">
                  <a href="#"> Sneaker</a>
                </li>
                <li className="text-base hover:text-[#f68c23]">
                  <a href="#"> Boat Shoes</a>
                </li>
                <li className="text-base hover:text-[#f68c23]">
                  <a href="#"> Loafers</a>
                </li>
                <li className="text-base hover:text-[#f68c23]">
                  <a href="#"> Sandals</a>
                </li>
                <li className="text-base hover:text-[#f68c23]">
                  <a href="#"> Slip-ons</a>
                </li>
              </ul>
            </div>
            <div className="w-1/2">
              <img
                src={men1}
                alt=""
                loading="lazy"
                className="w-full h-auto bg-cover"
              />
            </div>
          </div>
        )}
        <div>{hamburger && <Drawer />}</div>
      </div>
    </>
  );
};

export default Header;
