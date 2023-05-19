const React = require('react');
const Layout = require('./Layout');

module.exports = function Main({ user }) {
  return (
    <Layout user={user}>
      <h1>Hello, this is my solo project!</h1>
    </Layout>
  );
};
