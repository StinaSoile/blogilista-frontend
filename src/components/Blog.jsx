import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLike }) => {
  const [expand, setExpand] = useState(false);
  let creator;
  if (!blog.user) {
    creator = "no user";
  } else {
    creator = blog.user.username;
  }
  const handleExpand = () => {
    setExpand(!expand);
  };

  if (expand === false) {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={handleExpand}>view</button>
      </div>
    );
  }
  if (expand === true) {
    return (
      <div>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>Created by: {creator}</p>
        <button onClick={handleExpand}>hide</button>
      </div>
    );
  }
};

export default Blog;
