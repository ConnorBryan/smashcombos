import {
  weightClassToTag,
  characterFields,
  PercentageThresholds
} from "./constants";

export const generateEffectivePercentages = (percentages = {}) =>
  Object.entries(weightClassToTag).map(([key, value]) => ({
    label: value,
    value: `${percentages[key]}%`
  }));

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

export const getFilteredCharacters = (characters, filter) =>
  characters.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

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
