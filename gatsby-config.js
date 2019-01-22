const proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: "SmashCombos",
    description:
      "Attributes and combos for every member of the Smash Ultimate cast."
  },
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": ""
        }
      })
    );
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-less",
    "gatsby-transformer-json",
    /**
     * The below plugin creates the webmanifest
     * For reference: https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/?=
     * 1. This won't work until the `icon` option below has access to a 512x512 png
     * 2. I made a guess at your `theme_color`by using the color picker.
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SmashCombos`,
        short_name: `SmashCombos`,
        start_url: `/`,
        background_color: `#111`,
        theme_color: `#7189d8`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `static/img/logo-square.png` // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/characters`,
        name: "characters"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-132333303-1"
      }
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
