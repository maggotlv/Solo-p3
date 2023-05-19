const React = require('react');
const Layout = require('./Layout');

module.exports = function Profile({ user, moviesArr }) {
  return (
    <Layout user={user}>

      <div className="wrapper">
        {moviesArr.map((el) => (
          <div className="movie-div2" id={el.movieID}>
            <img src={el.image} className="img-fluid rounded-start" alt={el.name} width="200" height="320" />
            <div className="description">
              <h1 className="profileh1">{el.name}</h1>
              <p>{el.description}</p>
              <div className="checkbox">
                <input type="checkbox" name="watched" id="watched" />
                <label htmlFor="watched">Watched</label>
                <button id="remove" className="remove">Remove</button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </Layout>
  );
};
