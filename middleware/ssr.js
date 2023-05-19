const renderTemplate = require('../lib/renderTemplate');

function ssr(req, res, next) {
  res.render = (reactComponent, props) => {
    renderTemplate(reactComponent, { ...props, user: req.session?.user }, res);
  };
  next();
}

module.exports = ssr;
