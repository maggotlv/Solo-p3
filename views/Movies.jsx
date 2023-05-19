const React = require('react');
const Layout = require('./Layout');

module.exports = function Movies({ user }) {
  return (
    <Layout user={user}>
      <div className="moviebox">
        <div className="search-container">
          <input type="text" id="search-box" value="terminator" placeholder="Search movies" />
          <button type="submit" id="submit-movies">Search</button>
        </div>
        <div className="loader" />
        <div className="wrapper" />
      </div>
    </Layout>
  );
};
