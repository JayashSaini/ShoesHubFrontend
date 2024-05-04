import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const { accessToken = "", refreshToken = "" } = useParams();

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  useEffect(() => {
    navigate("/");
  }, []);

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
