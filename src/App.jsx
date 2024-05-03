import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      // setUsername("");
      // setPassword("");
      setNotification({
        message: `Welcome, ${user.username}`,
        type: "notification",
      });
    } catch (exception) {
      setNotification({ message: "Wrong credentials", type: "error" });
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLike = async (blog) => {
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
      user.token
    );
    console.log(changedBlog);

    const newBlogs = await blogService.getAll(user.token);
    setBlogs(newBlogs);
  };

  return (
    <div>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      {!user && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user && (
        <>
          <Logout handleLogout={handleLogout} username={user.username} />
          <Togglable buttonLabel="new blog">
            <CreateBlog
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              user={user}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
