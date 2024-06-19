import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col justify-center items-center gap-y-6">
      <div className="spinner"></div>
      <p className="text-center font-semibold text-3xl">Loading...</p>
    </div>
  );
};

export default Spinner;
