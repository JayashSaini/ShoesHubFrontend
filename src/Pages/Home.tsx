import { PrimaryButton } from "../Components";
import { logout } from "../features/auth";
import { useDispatch } from "react-redux";
import { ApiCall } from "../utils";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const logoutHandler = async () => {
    const accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    await ApiCall({
      url: "/api/v1/users/logout",
      method: "GET",
      data: {},
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(logout());
    window.location.reload();
  };

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
          <div
            onClick={async () => {
              await logoutHandler();
            }}>
            <PrimaryButton text="Log Out" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
