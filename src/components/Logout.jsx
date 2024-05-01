const Logout = ({ handleLogout, username }) => {
  return (
    <>
      <form onSubmit={handleLogout}>
        Logged in as {username}
        <button type="submit">logout</button>
      </form>
    </>
  );
};

export default Logout;
