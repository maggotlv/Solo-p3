const React = require('react');
const Layout = require('./Layout');

module.exports = function Register() {
  return (
    <Layout>
      <div className="reglog">
      <form className="register-form" action="/users/register" method="post">
        <input required type="text" name="name" placeholder="Username" />
        <input required type="password" name="password" placeholder="Password" />
        <button type="submit" id="submit-movies">Register</button>
      </form>
      </div>
    </Layout>
  );
};
