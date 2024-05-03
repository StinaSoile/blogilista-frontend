import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, currUser }) => {
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

  // EI OLE HAJALLA MUTTA EI TEE MITÄÄN JÄRKEVÄÄKÄÄN
  // - tee frontin blogit päivittymään kun tehdään muutos
  const handleLike = async () => {
    let likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: "no user",
    };
    if (blog.user) {
      likedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
    }
    const changedBlog = await blogService.likeBlog(
      blog.id,
      likedBlog,
      currUser.token
    );
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
          <button onClick={handleLike}>like</button>
        </p>
        <p>Created by: {creator}</p>
        <button onClick={handleExpand}>hide</button>
      </div>
    );
  }
};

export default Blog;
