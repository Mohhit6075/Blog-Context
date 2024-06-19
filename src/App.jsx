import { useContext, useEffect } from "react";
import "./App.css";
import { AppContext } from "./Context/AppContext";
import BlogPage from "./Pages/BlogPage";
import CategoryPage from "./Pages/CategoryPage";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";

function App() {
  const { fetchBlogPosts } = useContext(AppContext);
  const [searchParams , setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    if(location.pathname.includes("tags")){
       //it means tag's page should be showed
       const tag = location.pathname.split("/").at(-1).replace("-" , " ");
       fetchBlogPosts(Number(page) , tag);
    }
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replace("-", " ");
      fetchBlogPosts(Number(page) , null , category);

    }
    else{
      fetchBlogPosts(Number(page));
    }
    
  }, [location.pathname , location.search]);

  return (
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/blogs/:blogId" element = {<BlogPage />} />
        <Route path="tags/:tag" element = {<TagPage />} />
        <Route path="/categories/:category" element = {<CategoryPage />} />
      </Routes>
  );
}

export default App;
