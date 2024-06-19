import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";

const Blogs = () => {
  //consume
  const { posts, loading } = useContext(AppContext);
  console.log(posts);
  return (
    <>
      <div className="flex flex-col gap-y-10 my-4">
        {loading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <div className="min-h-[80vh] w-full flex justify-center items-center">
            <p className="text-center font-bold text-3xl">No Post Found !</p>
          </div>
        ) : (
          posts.map((post) => <BlogDetails key={post.id} post={post} />)
        )}
        ;
      </div>
    </>
  );
};

export default Blogs;
