import React from "react";
import { graphql } from "gatsby";

const getCharacter = data => data.markdownRemark.frontmatter;

const getCharacterRender = character =>
  character.render.childImageSharp.fluid.src;

export default function CharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);

  return <p>Character Page</p>;
}

export const characterPageQuery = graphql`
  query CharacterPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        name
        render {
          childImageSharp {
            fluid(maxWidth: 1075, quality: 72) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        attributes {
          weight {
            class
            rank
            value
          }
        }
        killConfirms {
          balloonweightPercentage
          featherweightPercentage
          heavyweightPercentage
          input
          lightweightPercentage
          middleweightPercentage
          superHeavyweightPercentage
        }
        combos {
          balloonweightPercentage
          featherweightPercentage
          heavyweightPercentage
          input
          lightweightPercentage
          middleweightPercentage
          superHeavyweightPercentage
        }
      }
    }
  }
`;
