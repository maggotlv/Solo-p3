const React = require('react');

module.exports = function Navbar({ user }) {
  return (
    <div className="navMenu">
      <a href="/">Home</a>
      <a href="/api">Giphy</a>
      <a href="/movies">Movies</a>
      {user?.name
        ? (
          <>
            <a href="/users/profile">Profile</a>
            <a href="/users/logout/">Logout</a>
          <p>User: {user?.name}</p>
          </>
        )
        : (
          <>
            <a href="/users/register/">Register</a>
            <a href="/users/login/">Login</a>
          </>
        )}
    </div>
  );
};
