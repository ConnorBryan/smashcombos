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

export const AttributeTypes = {
  AirAcceleration: 0,
  AirSpeed: 1,
  FallSpeed: 2,
  RunSpeed: 3,
  WalkSpeed: 4,
  Weight: 5
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

  if (!character.killConfirms) {
    character.killConfirms = [];
  }

  if (!character.combos) {
    character.combos = [];
  }

  if (!character.tags) {
    character.tags = [];
  }

  // Remove false combos.
  character.killConfirms = character.killConfirms.filter(
    killConfirm => killConfirm.input
  );
  character.combos = character.combos.filter(combo => combo.input);

  return character;
};

export const getCharacterRender = character => character.render;

export const getCharacters = data =>
  data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ fields: { slug } }) => slug.includes("characters"))
    .map(({ fields: { slug }, frontmatter }) => ({
      slug,
      ...frontmatter,
      // Remove false combos.
      killConfirms: frontmatter.killConfirms.filter(
        killConfirm => killConfirm.input
      ),
      combos: frontmatter.combos.filter(combo => combo.input)
    }));

export const getFilteredCharacters = (characters, filter) =>
  characters.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

export const SortTypes = {
  AtoZ: "A-Z",
  ZtoA: "Z-A",
  FewestKillConfirms: "Fewest Kill Confirms",
  MostKillConfirms: "Most Kill Confirms",
  FewestCombos: "Fewest Combos",
  MostCombos: "Most Combos"
};

export const sortFunctions = {
  [SortTypes.AtoZ]: (a, b) => a.name.localeCompare(b.name),
  [SortTypes.ZtoA]: (a, b) => b.name.localeCompare(a.name),
  [SortTypes.FewestKillConfirms]: (a, b) =>
    a.killConfirms.length - b.killConfirms.length,
  [SortTypes.MostKillConfirms]: (a, b) =>
    b.killConfirms.length - a.killConfirms.length,
  [SortTypes.FewestCombos]: (a, b) => a.combos.length - b.combos.length,
  [SortTypes.MostCombos]: (a, b) => b.combos.length - a.combos.length
};

export const WeightClasses = {
  All: "All weight classes",
  Balloonweight: "balloonweight",
  Featherweight: "featherweight",
  Lightweight: "lightweight",
  Middleweight: "middleweight",
  Heavyweight: "heavyweight",
  "Super Heavyweight": "superheavyweight"
};
