export const weightClassToTag = {
  balloonweight: "Balloonweight",
  featherweight: "Featherweight",
  lightweight: "Lightweight",
  middleweight: "Middleweight",
  heavyweight: "Heavyweight",
  superheavyweight: "Super Heavyweight"
};

export const generateEffectivePercentages = percentages =>
  Object.entries(weightClassToTag).map(([key, value]) => ({
    label: value,
    value: `${percentages[key]}%`
  }));

export const tagTypeToTag = {
  floatie: "Floatie",
  fastFaller: "Fast Faller",
  bigBody: "Big Body"
};

export const AttributeTypes = {
  AirAcceleration: "airAcceleration",
  AirSpeed: "airSpeed",
  FallSpeed: "fallSpeed",
  RunSpeed: "runSpeed",
  WalkSpeed: "walkSpeed",
  Weight: "weight"
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

export const attributeToInformationHash = {
  [AttributeTypes.AirAcceleration]: {
    name: "Air Acceleration",
    value: "airAcceleration",
    fields: [
      {
        label: "Max Additional",
        value: "maxAdditional"
      },
      {
        label: "Base Value",
        value: "baseValue"
      },
      {
        label: "Total",
        value: "total"
      }
    ]
  },
  [AttributeTypes.AirSpeed]: {
    name: "Air Speed",
    value: "airSpeed",
    fields: [
      {
        label: "Max Air Speed",
        value: "maxAirSpeed"
      }
    ]
  },
  [AttributeTypes.FallSpeed]: {
    name: "Fall Speed",
    value: "fallSpeed",
    fields: [
      {
        label: "Max Fall Speed",
        value: "maxFallSpeed"
      },
      {
        label: "Fast Fall Speed",
        value: "fastFallSpeed"
      },
      {
        label: "Speed Increase",
        value: "speedIncrease"
      }
    ]
  },
  [AttributeTypes.RunSpeed]: {
    name: "Run Speed",
    value: "runSpeed",
    fields: [
      {
        label: "Max Run Speed",
        value: "maxRunSpeed"
      }
    ]
  },
  [AttributeTypes.WalkSpeed]: {
    name: "Walk Speed",
    value: "walkSpeed",
    fields: [
      {
        label: "Max Walk Speed",
        value: "maxWalkSpeed"
      }
    ]
  },
  [AttributeTypes.Weight]: {
    name: "Weight",
    value: "weight",
    fields: [
      {
        label: "Weight Value",
        value: "value"
      }
    ]
  }
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
  MostCombos: "Most Combos",
  LowestAirAcceleration: "Lowest Air Acceleration",
  HighestAirAcceleration: "Highest Air Acceleration",
  LowestAirSpeed: "Lowest Air Speed",
  HighestAirSpeed: "Highest Air Speed",
  LowestFallSpeed: "Lowest Fall Speed",
  HighestFallSpeed: "Highest Fall Speed",
  LowestRunSpeed: "Lowest Run Speed",
  HighestRunSpeed: "Highest Run Speed",
  LowestWalkSpeed: "Lowest Walk Speed",
  HighestWalkSpeed: "Highest Walk Speed",
  LowestWeight: "Lowest Weight",
  HighestWeight: "Highest Weight"
};

export const sortTypesToPhrasesHash = {
  [SortTypes.AtoZ]: "alphabetically, ascending",
  [SortTypes.ZtoA]: "alphabetically, descending",
  [SortTypes.FewestKillConfirms]: "by kill confirm count, low to high",
  [SortTypes.MostKillConfirms]: "by kill confirm count, high to low",
  [SortTypes.FewestCombos]: "by combo count, low to high",
  [SortTypes.MostCombos]: "by combo count, high to low",
  [SortTypes.LowestAirAcceleration]: "by air acceleration, low to high",
  [SortTypes.HighestAirAcceleration]: "by air acceleration, high to low",
  [SortTypes.LowestAirSpeed]: "by air speed, low to high",
  [SortTypes.HighestAirSpeed]: "by air speed, high to low",
  [SortTypes.LowestFallSpeed]: "by fall speed, low to high",
  [SortTypes.HighestFallSpeed]: "by fall speed, high to low",
  [SortTypes.LowestRunSpeed]: "by run speed, low to high",
  [SortTypes.HighestRunSpeed]: "by run speed, high to low",
  [SortTypes.LowestWalkSpeed]: "by walk speed, low to high",
  [SortTypes.HighestWalkSpeed]: "by walk speed, high to low",
  [SortTypes.LowestWeight]: "by weight, low to high",
  [SortTypes.HighestWeight]: "by weight, high to low"
};

export const sortFunctions = {
  [SortTypes.AtoZ]: (a, b) => a.name.localeCompare(b.name),
  [SortTypes.ZtoA]: (a, b) => b.name.localeCompare(a.name),
  [SortTypes.FewestKillConfirms]: (a, b) =>
    a.killConfirms.length - b.killConfirms.length,
  [SortTypes.MostKillConfirms]: (a, b) =>
    b.killConfirms.length - a.killConfirms.length,
  [SortTypes.FewestCombos]: (a, b) => a.combos.length - b.combos.length,
  [SortTypes.MostCombos]: (a, b) => b.combos.length - a.combos.length,
  [SortTypes.LowestAirAcceleration]: (a, b) =>
    parseInt(b.attributes.airAcceleration.rank) -
    parseInt(a.attributes.airAcceleration.rank),
  [SortTypes.HighestAirAcceleration]: (a, b) =>
    parseInt(a.attributes.airAcceleration.rank) -
    parseInt(b.attributes.airAcceleration.rank),
  [SortTypes.LowestAirSpeed]: (a, b) =>
    parseInt(b.attributes.airSpeed.rank) - parseInt(a.attributes.airSpeed.rank),
  [SortTypes.HighestAirSpeed]: (a, b) =>
    parseInt(a.attributes.airSpeed.rank) - parseInt(b.attributes.airSpeed.rank),
  [SortTypes.LowestFallSpeed]: (a, b) =>
    parseInt(b.attributes.fallSpeed.rank) -
    parseInt(a.attributes.fallSpeed.rank),
  [SortTypes.HighestFallSpeed]: (a, b) =>
    parseInt(a.attributes.fallSpeed.rank) -
    parseInt(b.attributes.fallSpeed.rank),
  [SortTypes.LowestRunSpeed]: (a, b) =>
    parseInt(b.attributes.runSpeed.rank) - parseInt(a.attributes.runSpeed.rank),
  [SortTypes.HighestRunSpeed]: (a, b) =>
    parseInt(a.attributes.runSpeed.rank) - parseInt(b.attributes.runSpeed.rank),
  [SortTypes.LowestWalkSpeed]: (a, b) =>
    parseInt(b.attributes.walkSpeed.rank) -
    parseInt(a.attributes.walkSpeed.rank),
  [SortTypes.HighestWalkSpeed]: (a, b) =>
    parseInt(a.attributes.walkSpeed.rank) -
    parseInt(b.attributes.walkSpeed.rank),
  [SortTypes.LowestWeight]: (a, b) =>
    parseInt(b.attributes.weight.rank) - parseInt(a.attributes.weight.rank),
  [SortTypes.HighestWeight]: (a, b) =>
    parseInt(a.attributes.weight.rank) - parseInt(b.attributes.weight.rank)
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

export const weightClassesToPhrasesHash = {
  [WeightClasses.All]: "from all weight classes",
  [WeightClasses.Balloonweight]: "from the balloonweight class",
  [WeightClasses.Featherweight]: "from the feaherweight class",
  [WeightClasses.Lightweight]: "from the lightweight class",
  [WeightClasses.Middleweight]: "from the middleweight class",
  [WeightClasses.Heavyweight]: "from the heavyweight class",
  [WeightClasses["Super Heavyweight"]]: "from the super heavyweight class"
};
