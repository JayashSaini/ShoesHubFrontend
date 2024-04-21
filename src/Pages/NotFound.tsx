const NotFound = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center h-screen p-5">
      <h1 className="md:text-6xl text-5xl text-center font-bold text-blue-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="md:text-lg text-base text-center  text-blue-600">
        Sorry, the page you're looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
