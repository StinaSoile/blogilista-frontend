import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    }
    //   blogService.getAll().then((blogs) => setBlogs(blogs));
    // }, []);
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
      // blogService.setToken(user.token);
      setUser(user);
      // setUsername("");
      // setPassword("");
      setNotification({
        message: `Welcome, ${user.username}`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      //   setErrorMessage("wrong credentials");
      //   setTimeout(() => {
      //     setErrorMessage(null);
      //   }, 5000);
      setNotification({ message: "Wrong credentials", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

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
      setBlogs(blogs.concat(blog));
      setNotification({
        message: `New blog ${newBlog.title} created`,
        type: "notification",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      console.log("exception");
      setNotification({ message: "Could not create new blog", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div>
      <Notification notification={notification} />
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
          <CreateBlog
            handleCreateBlog={handleCreateBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
