export const weightClassToTag = {
  balloonweight: "Balloonweight",
  featherweight: "Featherweight",
  lightweight: "Lightweight",
  middleweight: "Middleweight",
  heavyweight: "Heavyweight",
  superheavyweight: "Super Heavyweight"
};

export const generateEffectivePercentages = (percentages = {}) =>
  Object.entries(weightClassToTag).map(([key, value]) => ({
    label: value,
    value: `${percentages[key]}%`
  }));

export const tagTypeToTag = {
  floatie: "Floatie",
  fastFaller: "Fast Faller",
  bigBody: "Big Body",
  diable: "DI-able",
  killConfirm: "Kill Confirm"
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
  const character = { ...data.charactersJson };

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

  if (!character.combos) {
    character.combos = [];
  }

  if (!character.tags) {
    character.tags = [];
  }

  // Remove false combos.
  character.combos = character.combos.filter(combo => combo.input);

  return character;
};

export const getCharacterRender = character => character.render;

export const getCharacters = data =>
  data.allCharactersJson.edges
    .map(({ node }) => node)
    // .filter(({ fields: { slug } }) => slug.includes("characters"))
    .map(character => ({
      ...character,
      // Remove false combos.
      combos: character.combos.filter(combo => combo.input)
    }));

export const getFilteredCharacters = (characters, filter) =>
  characters.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

export const SortTypes = {
  AtoZ: "A-Z",
  ZtoA: "Z-A",
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

export const weightClassLabelsAndValues = Object.entries(WeightClasses).reduce(
  (prev, [key, value]) => {
    if (key !== "All") {
      prev.push({
        label: key,
        value
      });
    }

    return prev;
  },
  []
);

export const weightClassesToPhrasesHash = {
  [WeightClasses.All]: "from all weight classes",
  [WeightClasses.Balloonweight]: "from the balloonweight class",
  [WeightClasses.Featherweight]: "from the feaherweight class",
  [WeightClasses.Lightweight]: "from the lightweight class",
  [WeightClasses.Middleweight]: "from the middleweight class",
  [WeightClasses.Heavyweight]: "from the heavyweight class",
  [WeightClasses["Super Heavyweight"]]: "from the super heavyweight class"
};

// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
export const copyToClipboard = str => {
  const el = document.createElement("textarea"); // Create a <textarea> element
  el.value = str; // Set its value to the string that you want copied
  el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
  el.style.position = "absolute";
  el.style.left = "-9999px"; // Move outside the screen to make it invisible
  document.body.appendChild(el); // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0) // Store selection if found
      : false; // Mark as false to know no selection existed before
  el.select(); // Select the <textarea> content
  document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el); // Remove the <textarea> element
  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
    document.getSelection().addRange(selected); // Restore the original selection
  }
};

export const PercentageThresholds = {
  Error: 0,
  VeryLow: 1,
  Low: 2,
  Medium: 3,
  High: 4,
  VeryHigh: 5
};

export const getPercentageThreshhold = value => {
  const int = parseInt(value);

  if (isNaN(int) || int < 0) {
    return PercentageThresholds.Error;
  } else if (int >= 0 && int <= 20) {
    return PercentageThresholds.VeryLow;
  } else if (int >= 21 && int <= 40) {
    return PercentageThresholds.Low;
  } else if (int >= 41 && int <= 60) {
    return PercentageThresholds.Medium;
  } else if (int >= 61 && int <= 80) {
    return PercentageThresholds.High;
  } else {
    return PercentageThresholds.VeryHigh;
  }
};

export const percentageThresholdToColor = percentageThreshold => {
  return {
    [PercentageThresholds.Error]: "grey",
    [PercentageThresholds.VeryLow]: "green",
    [PercentageThresholds.Low]: "olive",
    [PercentageThresholds.Medium]: "yellow",
    [PercentageThresholds.High]: "orange",
    [PercentageThresholds.VeryHigh]: "red"
  }[percentageThreshold];
};
