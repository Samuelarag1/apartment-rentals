import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full border-t-4 border-white w-16 h-16"></div>
    </div>
  );
};

export default Loader;
