const fs = require("fs");
const pify = require("pify");
const path = require("path");
const slugify = require("slugify");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

const { getSortedAttribValues, setRankedAttributes } = require("./update-ranks");

const asyncReaddir = pify(fs.readdir);
const asyncReadFile = pify(fs.readFile);
const asyncWriteFile = pify(fs.writeFile);

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

// Perform programmatic character ranking
exports.onPreBootstrap = async () => {
  try {
    const files = await asyncReaddir(path.join(__dirname, "src/characters"));
    const characters = await Promise.all(files.map(async file => {
      const fileData = await asyncReadFile(path.join(__dirname, `src/characters/${file}`));
      return JSON.parse(fileData);
    }));
    const setRanksOnCharacter = setRankedAttributes(getSortedAttribValues(characters));
    return Promise.all(characters.map(character => asyncWriteFile(
      path.join(__dirname, `src/characters/${character.basename}.json`),
      JSON.stringify(setRanksOnCharacter(character), null, 2)
    )));
  } catch (err) {
    console.error("Unable to update character attribute rankings, falling back to hardcoded values", err);
  }
}
