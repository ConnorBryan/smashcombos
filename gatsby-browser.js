const netlifyIdentity = require("netlify-identity-widget");

exports.onClientEntry = () => {
  netlifyIdentity.init();
};
