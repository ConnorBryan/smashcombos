export const weightClassToTag = {
  balloonweight: "Balloonweight",
  featherweight: "Featherweight",
  lightweight: "Lightweight",
  middleweight: "Middleweight",
  heavyweight: "Heavyweight",
  superheavyweight: "Super Heavyweight"
};

export const tagTypeToTag = {
  floatie: "Floatie",
  fastFaller: "Fast Faller",
  bigBody: "Big Body"
};

export const getCharacter = data => data.markdownRemark.frontmatter;

export const getCharacterRender = character => character.render;

export const getCharacters = data =>
  data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ fields: { slug } }) => slug.includes("characters"))
    .map(({ fields: { slug }, frontmatter }) => ({
      slug,
      ...frontmatter
    }));

export const getFilteredCharacters = (characters, filter) =>
  characters.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
