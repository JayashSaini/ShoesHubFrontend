import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCart } from "@/features/cart.js";
import { setWishlist } from "../features/wishlist.js";
import { ApiCall } from "../utils/index.js";
import { login, setIsAuthenticated } from "../features/auth/index.js";
import { UserState, AuthState } from "../types/state.js";
import { useDispatch } from "react-redux";
import { setProfile } from "@/features/profile.js";

const Redirect = () => {
  const navigate = useNavigate();
  const { accessToken = "", refreshToken = "" } = useParams();
  const dispatch = useDispatch();

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken || accessToken.trim() === "") {
        dispatch(setIsAuthenticated(false));
        navigate("/login");
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

          const profileResponse = await ApiCall({
            url: "/api/v1/profile",
            method: "GET",
          });
          const { firstName, lastName, email, phoneNumber } =
            profileResponse.data.data;

          dispatch(setProfile({ firstName, lastName, email, phoneNumber }));
          navigate("/");
        } else if (response.error) {
          dispatch(setIsAuthenticated(false));
          navigate("/login");
        }
      } catch (error) {
        dispatch(setIsAuthenticated(false));
        navigate("/login");
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="w-full h-screen custom-flex fixed top-0 left-0 bg-white z-50">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#f68c23"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};

export default Redirect;
