import { useState, useEffect, useRef } from "react";
import sidesection from "../assets/sidesection.jpg";
import { Input, PrimaryButton, SSOButton } from "../Components";
import { gsap } from "gsap";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { ApiCall } from "../utils";
import { useDispatch } from "react-redux";
import { login, loginFailed } from "../features/auth";
import { AuthState, UserState } from "../types/state";
import { useNavigate, Link } from "react-router-dom";
import { setCart } from "@/features/cart.js";
import { setWishlist } from "../features/wishlist.js";
import { setProfile } from "@/features/profile.js";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const imgRef = useRef(null);
  const loginRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(imgRef.current, {
      duration: 3,
      opacity: 1,

      ease: "power3.out",
    });
    gsap.to(loginRef.current, {
      duration: 1,
      opacity: 1,

      ease: "power3.out",
    });
  }, []);

  const loginHandler = async (e: any) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Invalid password", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      try {
        setIsLoading(true);
        const response = await ApiCall({
          url: "/api/v1/users/login",
          method: "POST",
          data: {
            email,
            password,
          },
        });
        if (response.data) {
          const user: any = response.data?.data?.user;
          const accessToken: string = response.data?.data?.accessToken;
          const refreshToken: string = response.data?.data?.refreshToken;

          await Promise.all([
            localStorage.setItem("accessToken", accessToken),
            localStorage.setItem("refreshToken", refreshToken),
            localStorage.setItem("username", user?.username),
          ]);

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
          dispatch(setWishlist(wishlistResponse.data.data.products));

          const profileResponse = await ApiCall({
            url: "/api/v1/profile",
            method: "GET",
          });
          const { firstName, lastName, email, phoneNumber } =
            profileResponse.data.data;
          dispatch(setProfile({ firstName, lastName, email, phoneNumber }));

          setIsLoading(false);
          navigate("/", { replace: true });
        }
        if (response.error) {
          setIsLoading(false);
          if (response.error.data.errors) {
            const errorKeys = Object.keys(response.error.data.errors);
            if (errorKeys.length > 0) {
              const firstErrorKey = errorKeys[0];
              const errorObject: object =
                response.error.data.errors[firstErrorKey];
              const errorMessage = Object.values(errorObject)[0];
              toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
              });
              dispatch(loginFailed(errorMessage));
            } else if (response.error.data.message) {
              toast.error(response.error.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
              });
              dispatch(loginFailed(response.error.data.message));
            }
          } else if (response.error.data.message) {
            toast.error(response.error.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
            });
            dispatch(loginFailed(response.error.data.message));
          }
        }
      } catch (error) {
        console.log("error is : ", error);
        setIsLoading(false);
        toast.error("Login Failed", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(loginFailed("Login Failed"));
      }
    }
  };

  const SSOHandler = () => {
    try {
      window.open(
        "https://shoeshubbackend.onrender.com/api/v1/users/google",
        "_self"
      );
      // window.open("http://localhost:8000/api/v1/users/google", "_self");
    } catch (error) {
      toast.error("Sing in Failed", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <div className="w-full md:h-full h-[70vh] flex justify-around items-center">
        <div className="w-[55%] h-screen custom-flex md:flex hidden">
          <img
            src={sidesection}
            alt="sidesection"
            className="w-full h-full md:flex hidden opacity-0"
            ref={imgRef}
          />
        </div>
        <div
          ref={loginRef}
          className="w-full md:w-[45%] opacity-0 p-6 md:p-4 h-full custom-flex">
          <div className="w-full md:w-[90%]  sm:w-[60%] w-full h-auto px-4 md:px-8 py-3">
            <form onSubmit={loginHandler}>
              <h2 className="main-heading-font sm:text-3xl text-2xl md:text-4xl text-center mb-6">
                Log in
              </h2>
              <Input
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="enter your email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="atleast 8 characters"
                value={password}
              />
              <div className="text-right">
                <Link
                  className="text-[#f68c23] sm:text-sm text-[11px] font-medium"
                  to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <div className="sm:my-10 my-6 flex flex-col sm:gap-4 gap-3">
                <PrimaryButton text="Log in" />
                <SSOButton onClick={SSOHandler} />
              </div>
              <div className="text-center">
                <h3 className="sm:text-sm text-[12px] text-gray-600">
                  Don't have an account? &nbsp;
                  <Link
                    className="text-[#f68c23] sm:text-[15px] text-[13px] font-bold"
                    to="/register">
                    Register
                  </Link>
                </h3>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      {isLoading && (
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
      )}
    </>
  );
};

export default Login;
