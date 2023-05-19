const React = require('react');
const Layout = require('./Layout');

module.exports = function Login() {
  return (
    <Layout>
      <div className="reglog">
      <form className="login-form" action="/users/register" method="post">
        <input required type="text" name="name" placeholder="Username" />
        <input required type="password" name="password" placeholder="Password" />
        <button type="submit" id="submit-movies">Login</button>
        <p>Don't have an account? <a href="/users/register">Register!</a></p>
      </form>
        </div>
    </Layout>
  );
};
