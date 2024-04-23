import { useState, useEffect } from "react";
import { PrimaryButton } from "../Components";
import { UserState, AuthState } from "../types";
import { login, loginFailed } from "../features/auth";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../utils";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAuthenticated = useSelector(
    (state: AuthState) => state.isAuthenticated
  );

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) {
        try {
          setIsLoading(true);
          const response = await ApiCall({
            url: "/api/v1/users/self",
            method: "GET",
            data: {},
          });
          setIsLoading(false);
          if (response.data) {
            const user: any = response.data?.data;
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

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
          } else if (response.error) {
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
          console.log("Error is : " + error);
          toast.error("Login Failed", {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(loginFailed("Login Failed"));
        }
      }
    })();
  }, []);
  const state = useSelector((state: any) => state.user);
  console.log("current state : " + state);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl text-blue-600 text=center mb-8">
          Welcome to Your Dashboard
        </h1>
        {/* Your dashboard content goes here */}
        <div className="flex flex-col items-center space-y-4">
          {/* Add your dashboard content here */}
        </div>
        {/* Logout button */}
        <div className="my-5 w-40">
          <div onClick={logoutHandler}>
            <PrimaryButton text="Log Out" />
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
            color="#4049f8"
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

export default Home;
