const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
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

    const charcters = result.data.allMarkdownRemark.edges;

    charcters.forEach(
      ({
        node: {
          id,
          frontmatter: { templateKey },
          fields: { slug }
        }
      }) => {
        createPage({
          path: slug,
          component: path.resolve(`src/templates/${String(templateKey)}.js`),
          // additional data can be passed via context
          context: {
            id
          }
        });
      }
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  console.log("\n\n\n", "node pre", node, "\n\n\n");
  fmImagesToRelative(node); // convert image paths for gatsby images
  console.log("\n\n\n", "node post", node, "\n\n\n");

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
