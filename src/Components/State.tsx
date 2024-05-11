import React, { useEffect, useState } from "react";
import { Loading } from "../Components/index.js";
import { setCart } from "@/features/cart.js";
import { setWishlist } from "../features/wishlist.js";
import Layout from "../Layout.js";
import { ApiCall } from "../utils/index.js";
import { login, setIsAuthenticated } from "../features/auth/index.js";
import { UserState, AuthState } from "../types/state.js";
import { useDispatch } from "react-redux";

const StateMiddlewareComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || accessToken.trim() === "") {
        dispatch(setIsAuthenticated(false));
        setIsLoading(false);
        return;
      }
      try {
        const response = await ApiCall({
          url: "/api/v1/users/self",
          method: "GET",
          data: {},
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          const user: any = response.data?.data;
          const userState: UserState = {
            userId: user?._id,
            username: user?.username,
            email: user?.email,
            isEmailVerified: user?.isEmailVerified,
            avatar: user?.avatar,
            role: user?.role,
            accessToken: accessToken,
            refreshToken: refreshToken,
            isLoggedIn: true,
          };
          const loginPayload: AuthState = {
            isAuthenticated: true,
            user: userState,
            error: null,
          };
          dispatch(login(loginPayload));

          // Fetch cart data
          const cartResponse = await ApiCall({
            url: `/api/v1/cart/`,
            method: "GET",
          });
          dispatch(
            setCart({
              cart: [...cartResponse.data.data.items],
              totalPrice: cartResponse.data.data.cartTotal,
              discountedTotalPrice: cartResponse.data.data.discountedTotal,
            })
          );

          // Fetch wishlist data
          const wishlistResponse = await ApiCall({
            url: `/api/v1/wishlist/`,
            method: "GET",
          });
          const productIds = wishlistResponse.data.data.products;
          dispatch(setWishlist(productIds));
        } else if (response.error) {
          dispatch(setIsAuthenticated(false));
          setIsLoading(false);
          return;
        }
      } catch (error) {
        dispatch(setIsAuthenticated(false));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return <Layout />;
};

export default StateMiddlewareComponent;
