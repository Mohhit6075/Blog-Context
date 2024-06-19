import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Blogs from "../Components/Blogs";
import Pagination from "../Components/Pagination";

const CategoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.pathname.split("/").at(-1);
  return (
    <>
      <div>
        <Header />
        <div className="mt-[100px]">
          <div className="mt-[100px] mb-6 max-w-2xl mx-auto flex items-center space-x-2">
            <button
              className="border-2 border-gray-300 py-1 px-4 rounded-md hover:bg-slate-300"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <h2 className="text-xl font-bold">
              Blogs On <span className="underline text-blue-700">{category}</span>
            </h2>
          </div>
          <Blogs />
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
