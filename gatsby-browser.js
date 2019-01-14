const netlifyIdentity = require("netlify-identity-widget");

exports.onClientEntry = () => {
  netlifyIdentity.init();

  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    console.log("Before install prompt.");
  });
};
