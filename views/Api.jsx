const React = require('react');
const Layout = require('./Layout');

module.exports = function Api({ user }) {
  return (
    <Layout user={user}>
      <div className="box">
        <div className="search-container">
          <input type="text" id="search-box" placeholder="Search Giphy" />
          <button id="submit-btn">Submit</button>
        </div>
        <div className="loader" />
        <div className="wrapper" />
      </div>
    </Layout>
  );
};
