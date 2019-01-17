const netlifyIdentity = require("netlify-identity-widget");

exports.onClientEntry = () => {
  netlifyIdentity.init();

  // Progressive Web App
  window.addEventListener("beforeinstallprompt", e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    e.prompt();
  });
};
