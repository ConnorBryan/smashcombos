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

export const characterFields = {
  name: "",
  description: "",
  attributes: {
    airAcceleration: {
      maxAdditional: "",
      baseValue: "",
      total: "",
      rank: ""
    },
    airSpeed: {
      maxAirSpeed: "",
      rank: ""
    },
    fallSpeed: {
      maxFallSpeed: "",
      fastFallSpeed: "",
      speedIncrease: "",
      rank: ""
    },
    runSpeed: {
      maxRunSpeed: "",
      rank: ""
    },
    walkSpeed: {
      maxWalkSpeed: "",
      rank: ""
    },
    weight: {
      class: "",
      value: "",
      rank: ""
    }
  },
  combos: [],
  tags: []
};

export const getCharacter = data => {
  const character = { ...data.markdownRemark.frontmatter };

  if (!character.attributes) {
    character.attributes = characterFields.attributes;
  }

  [
    "airAcceleration",
    "airSpeed",
    "fallSpeed",
    "runSpeed",
    "walkSpeed",
    "weight"
  ].forEach(attribute => {
    if (!character.attributes[attribute]) {
      character.attributes[attribute] = characterFields.attributes[attribute];
    }
  });

  return character;
};

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
