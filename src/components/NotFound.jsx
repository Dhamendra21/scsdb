import React from "react";
import loader from "./../../public/404.gif"
const NotFound = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-black">
        <img className="" src={loader} alt="" />
    </div>
  );
};

export default NotFound;
