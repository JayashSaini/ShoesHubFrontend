import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
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
  );
};

export default Loading;
