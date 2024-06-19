import React from 'react'
import Header from "../Components/Header";
import Blogs from "../Components/Blogs";
import Pagination from "../Components/Pagination";

const Home = () => {
  return (
    <div>
      <Header />
        <div className='my-[100px]'>
          <Blogs />
          <Pagination />
        </div>
    </div>
  )
}

export default Home;
