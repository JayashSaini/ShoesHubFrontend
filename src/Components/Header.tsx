import React, { useState, useEffect } from "react";
import Logo from "../assets/favicon1.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
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
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

const Header: React.FC = () => {
  const hamburger = useSelector((state: RootState) => state.features.hamburger);
  const menCategory = useSelector(
    (state: RootState) => state.features.category.men
  );
  const womenCategory = useSelector(
    (state: RootState) => state.features.category.women
  );
  const avatar: any = useSelector((state: RootState) => state.user.user.avatar);
  const username = useSelector((state: RootState) => state.user.user.username);

  const [showCategoryContainer, setShowCategoryContainer] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] =
    useState<string>("men's");
  const [currentCategory, setCurrentCategory] = useState<CategoryType[]>([]);
  const cartCount = useSelector((state: RootState) => {
    return state.cart.cart.length;
  });

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -0,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff5722", // Change this to your desired primary color
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          className={`w-full h-auto ${
            isFixed ? "fixed top-0 z-40 transition-all duration-500" : ""
          }`}
          onMouseLeave={handleMouseLeave}>
          <div className="w-full h-auto bg-white  md:px-16 px-4 py-2 flex justify-between items-center border-b-2 border-gray-200 ">
            <div>
              <Link to="/">
                <img
                  src={Logo}
                  alt="Shoes Hub"
                  loading="lazy"
                  className="md:w-[70px] w-[55px] cursor-pointer"
                />
              </Link>
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
                    to="/p/collection/men's/662fd720288f5b59eb7d3917"
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
                    to="/p/collection/women's/662fd9c4d2c102242565f2c2"
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
                <ul className="flex justify-evenly items-center">
                  <li className="px-2">
                    <Link
                      to="/wishlist"
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast("Please login to view your wishlist.");
                          navigate("/login");
                        }
                      }}>
                      <FaRegHeart className="text-[18px]   cursor-pointer hover:scale-105" />
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to="/cart"
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast("Please login to view your cart.");
                          navigate("/login");
                        }
                      }}>
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartCount} color="primary">
                          <MdOutlineShoppingCart className="text-gray-700" />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </li>
                  <li className="px-2">
                    <Link
                      to="/profile"
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast("Please login to view your profile.");
                          navigate("/login");
                        }
                      }}>
                      <Avatar>
                        <AvatarImage src={avatar.url} alt="" />
                        <AvatarFallback className="text-lg">
                          {username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>{" "}
                    </Link>
                  </li>
                  {!isAuthenticated && (
                    <li
                      className="px-2 md:block hidden"
                      onClick={() => {
                        navigate("/login");
                      }}>
                      <button className="bg-[#f68c23] py-[10px] px-5 text-sm main-heading-font text-black rounded-sm">
                        Log in
                      </button>
                    </li>
                  )}
                </ul>
              </div>
              <div className="block md:hidden flex gap-2 items-center justify-evenly">
                {!hamburger && (
                  <div className="flex md:gap-2   items-center">
                    <Link to="/cart">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartCount} color="primary">
                          <MdOutlineShoppingCart className="text-black" />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </div>
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
                      <Link
                        onClick={handleMouseLeave}
                        to={`/collection/${currentCategoryName}-${category.name}/${category._id}`}>
                        {category.name}
                      </Link>
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
      </ThemeProvider>
    </>
  );
};

export default Header;
