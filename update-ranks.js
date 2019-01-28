const { get, toNumber, orderBy, flow, partialRight, isEmpty } = require("lodash");

const attributeValueHash = {
  "airAcceleration": "total",
  "airSpeed": "maxAirSpeed",
  "fallSpeed": "maxFallSpeed",
  "runSpeed": "maxRunSpeed",
  "walkSpeed": "maxWalkSpeed",
  "weight": "value"
}

const getAttribValueAsNumber = attribute => ({ attributes }) => flow(
  partialRight(get, [attribute, attributeValueHash[attribute]]),
  toNumber
)(attributes);

exports.getSortedAttribValues = characters =>
  Object.entries(attributeValueHash).reduce((acc, [attribute, value]) => ({
    ...acc,
    [attribute]: orderBy(characters.map(getAttribValueAsNumber(attribute)), [], "desc"),
  }), {});

exports.setRankedAttributes = rankedAttributes => character => {
  const { attributes } = character;
  return {
    ...character,
    attributes: {
      ...attributes,
      ...Object.entries(attributes).reduce((acc, [attribute, value]) => {
        const attributeObj = attributes[attribute];
        const attributeValue = attributeValueHash[attribute];
        return {
          ...acc,
          [attribute]: {
            ...attributeObj,
            rank: `${rankedAttributes[attribute].indexOf(toNumber(attributeObj[attributeValue])) + 1}`
          }
        }
      }, {})
    }
  }
};
