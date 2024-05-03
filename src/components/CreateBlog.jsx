import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({
  blogs,
  setBlogs,
  setNotification,
  user,
  fetchBlogs,
  // handleCreateBlog,
  // title,
  // setTitle,
  // author,
  // setAuthor,
  // url,
  // setUrl,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      const blog = await blogService.createBlog(newBlog, user.token);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification({
        message: `New blog ${newBlog.title} created`,
        type: "notification",
      });
      fetchBlogs();
    } catch (exception) {
      setNotification({ message: "Could not create new blog", type: "error" });
    }
  };
  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateBlog;
