import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import BlogDetails from "../Components/BlogDetails";
import { AppContext } from "../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";

const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { loading, setLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const blogId = location.pathname.split('/').at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    } catch (error) {
      console.log("Error has arrived");
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname]);
  return (
    <>
      <div>
        <Header />
        <div className="mt-[100px] mb-6 max-w-2xl mx-auto">
          <button
            className="border-2 border-gray-300 py-1 px-4 rounded-md hover:bg-slate-300"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : blog ? (
          <div>
            <BlogDetails post={blog} />
            <h2 className="max-w-2xl mx-auto mt-12 font-bold text-3xl mb-8">
              {" "}
              Related Blogs{" "}
            </h2>
            {relatedBlogs.map((post) => (
              <div key={blog.id}>
                <BlogDetails post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center max-w-2xl mx-auto mt-12 font-bold text-3xl mb-8">
              No Blog Found
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
