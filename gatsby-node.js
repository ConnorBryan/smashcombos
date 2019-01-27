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
            combos {
              uuid
            }
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

    characters.forEach(({ node: { id, slug, combos } }) => {
      // View
      createPage({
        path: slug,
        component: path.resolve(`src/templates/character-page.js`),
        context: {
          id
        }
      });

      // Edit
      createPage({
        path: `${slug}/edit`,
        component: path.resolve("src/templates/edit-character-page.js"),
        context: {
          id
        }
      });

      // Create combo
      createPage({
        path: `${slug}/combos/create`,
        component: path.resolve("src/templates/add-combo-page.js"),
        context: {
          id
        }
      });

      combos.forEach(({ uuid }) => {
        // View combo
        createPage({
          path: `${slug}/combos/${uuid}`,
          component: path.resolve("src/templates/view-combo-page.js"),
          context: {
            id,
            uuid
          }
        });

        // Edit combo
        createPage({
          path: `${slug}/combos/${uuid}/edit`,
          component: path.resolve("src/templates/edit-combo-page.js"),
          context: {
            id,
            uuid
          }
        });
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
