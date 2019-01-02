const path = require("path");
const slugify = require("slugify");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allCharactersJson {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const characters = result.data.allCharactersJson.edges;

    characters.forEach(({ node: { id, slug } }) => {
      createPage({
        path: slug,
        component: path.resolve(`src/templates/character-page.js`),
        context: {
          id
        }
      });
    });
  });
};

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "../../theme.config$": path.join(__dirname, "src/semantic/theme.config")
      }
    }
  });
};
