import React, { useState, useEffect } from "react";
import Logo from "../assets/favicon1.svg";
import { NavLink, Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleHamburger,
  setMenCategory,
  setWomenCategory,
} from "../features/features.js";
import { RootState } from "../types/state.js";
import Drawer from "./Drawer.js";
import men1 from "../assets/men1.jpg";
import women1 from "../assets/women1.jpg";
import { ApiCall } from "@/utils/index.js";
import { CategoryType } from "@/types/category.js";

const Header: React.FC = () => {
  const hamburger = useSelector((state: RootState) => state.features.hamburger);
  const menCategory = useSelector(
    (state: RootState) => state.features.category.men
  );
  const womenCategory = useSelector(
    (state: RootState) => state.features.category.women
  );
  const [showCategoryContainer, setShowCategoryContainer] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] =
    useState<string>("men's");
  const [currentCategory, setCurrentCategory] = useState<CategoryType[]>([]);

  const dispatch = useDispatch();

  const handleMouseEnter = (category: string) => {
    setCurrentCategoryName(category);
    if (category == "men's") setCurrentCategory(menCategory);
    else setCurrentCategory(womenCategory);
    setShowCategoryContainer(true);
  };

  const handleMouseLeave = () => {
    setShowCategoryContainer(false);
  };

  const toggleHamburgerHander = () => {
    dispatch(toggleHamburger()); // Dispatch the action
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the window has scrolled past a certain threshold (e.g., 100px)
      const scrollThreshold = 100;
      if (window.pageYOffset > scrollThreshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    ApiCall({
      url: `/api/v1/category/c/662fd720288f5b59eb7d3917`,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          dispatch(setMenCategory([...res.data.data.childCategories]));
        }
      })
      .catch();
    ApiCall({
      url: `/api/v1/category/c/662fd9c4d2c102242565f2c2`,
      method: "GET",
    })
      .then((res) => {
        if (res.data) {
          dispatch(setWomenCategory([...res.data.data.childCategories]));
        }
      })
      .catch();
  }, []);
  return (
    <>
      <div
        className={`w-full h-auto ${
          isFixed ? "fixed top-0 z-40 transition-all duration-500" : ""
        }`}
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
                  }
                  onClick={handleMouseLeave}>
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
                  }
                  onClick={handleMouseLeave}>
                  New
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="collection/men's"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm px-3 text-[#f68c23]"
                      : "text-sm px-3 hover:text-[#f68c23]"
                  }
                  onMouseEnter={() => {
                    handleMouseEnter("men's");
                  }}
                  onClick={handleMouseLeave}>
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="collection/women's"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm px-3 text-[#f68c23]"
                      : "text-sm px-3 hover:text-[#f68c23]"
                  }
                  onMouseEnter={() => {
                    handleMouseEnter("women's");
                  }}
                  onClick={handleMouseLeave}>
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
          <div className="w-full min-h-[300px] fixed bg-white py-6 px-8 flex justify-between z-50 ">
            <div className="px-5 w-1/2">
              <h2 className="text-[#f68c23] roboto-bold sm:text-3xl text-2xl text-left mb-8 ">
                {currentCategoryName == "men's" ? "Men Shoes" : "Women Shoes"}
              </h2>
              <ul className="grid grid-cols-2 gap-x-20 gap-y-4">
                {currentCategory.map((category) => (
                  <li
                    key={category._id}
                    className="text-base hover:text-[#f68c23]">
                    <a
                      onClick={handleMouseLeave}
                      href={`/collection/${currentCategoryName}-${category.name}/${category._id}`}>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2 flex justify-end">
              <img
                src={currentCategoryName == "men's" ? men1 : women1}
                alt=""
                loading="lazy"
                className="w-auto max-h-[400px] bg-cover"
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
