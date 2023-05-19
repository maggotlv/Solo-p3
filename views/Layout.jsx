const React = require('react');
const Navbar = require('./Navbar');

module.exports = function Layout({ children, user }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/index.css" />
        <script defer src="/client.js" />
        <script defer src="/script.js" />
        <script defer src="/users-scripts.js" />
        <title>Clever title</title>
      </head>
      <Navbar user={user} />
      <body>
        <div className="scroll" />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
};
