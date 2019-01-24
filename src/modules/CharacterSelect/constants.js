import { WeightClasses } from "../../constants";

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

export const weightClassesToPhrasesHash = {
  [WeightClasses.All]: "from all weight classes",
  [WeightClasses.Balloonweight]: "from the balloonweight class",
  [WeightClasses.Featherweight]: "from the feaherweight class",
  [WeightClasses.Lightweight]: "from the lightweight class",
  [WeightClasses.Middleweight]: "from the middleweight class",
  [WeightClasses.Heavyweight]: "from the heavyweight class",
  [WeightClasses["Super Heavyweight"]]: "from the super heavyweight class"
};
