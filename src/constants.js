export const WeightClasses = {
  All: "All weight classes",
  Balloonweight: "balloonweight",
  Featherweight: "featherweight",
  Lightweight: "lightweight",
  Middleweight: "middleweight",
  Heavyweight: "heavyweight",
  "Super Heavyweight": "superheavyweight"
};

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
  bigBody: "Big Body",
  diable: "DI-able",
  killConfirm: "Kill Confirm"
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

export const PercentageThresholds = {
  Error: 0,
  VeryLow: 1,
  Low: 2,
  Medium: 3,
  High: 4,
  VeryHigh: 5
};

export const AttributeTypes = {
  AirAcceleration: "airAcceleration",
  AirSpeed: "airSpeed",
  FallSpeed: "fallSpeed",
  RunSpeed: "runSpeed",
  WalkSpeed: "walkSpeed",
  Weight: "weight"
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
