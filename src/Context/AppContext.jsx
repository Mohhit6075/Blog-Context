import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

//step 1 : context creation
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState([1]);
  const [totalPages, setTotalPages] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch Blog Data
  async function fetchBlogPosts(page = 1, tag = null, category) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    try {
      const result = await fetch(url);
      const data = await result.json();
      if (!data.posts || data.posts.length === 0)
        throw new Error("Something Went Wrong");

      console.log("API Response: ", data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in fetching BlogPosts ", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  }

  function handlePageChange(page) {
    navigate({ search: `?page=${page}` });
    setPage(page);
  }

  const value = {
    loading,
    setLoading,
    page,
    setPage,
    posts,
    setPosts,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };
  //step 2 : context providing
  return <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>;
}
