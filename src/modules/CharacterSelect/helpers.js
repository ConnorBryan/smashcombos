export const getCharacters = data =>
  data.allCharactersJson.edges
    .map(({ node }) => node)
    .map(character => ({
      ...character,
      combos: character.combos.filter(combo => combo.input)
    }));
