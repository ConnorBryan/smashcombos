import React from "react";
import { graphql } from "gatsby";

import {
  CharacterProfile,
  AttributePanel,
  Layout,
  MobileComboList,
  DesktopComboList
} from "../components";
import { getCharacter, getCharacterRender } from "../helpers";
import "./character-page.scss";

export default function CharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, description, attributes, combos, tags } = character;
  const {
    weight: { class: weightClass }
  } = attributes;

  return (
    <Layout>
      <CharacterProfile
        image={image}
        name={name}
        description={description}
        weightClass={weightClass}
        tags={tags}
      />
      <AttributePanel attributes={attributes} />
      <div className="mobile-only">
        <MobileComboList combos={combos} />
      </div>
      <div className="desktop-only">
        <DesktopComboList combos={combos} />
      </div>
    </Layout>
  );
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
        description
        attributes {
          airAcceleration {
            maxAdditional
            baseValue
            total
            rank
          }
          airSpeed {
            maxAirSpeed
            rank
          }
          fallSpeed {
            maxFallSpeed
            fastFallSpeed
            speedIncrease
            rank
          }
          runSpeed {
            maxRunSpeed
            rank
          }
          walkSpeed {
            maxWalkSpeed
            rank
          }
          weight {
            class
            rank
            value
          }
        }
        killConfirms {
          input
          percentages {
            balloonweight
            featherweight
            lightweight
            middleweight
            heavyweight
            superheavyweight
          }
        }
        combos {
          input
          percentages {
            balloonweight
            featherweight
            lightweight
            middleweight
            heavyweight
            superheavyweight
          }
          damage
          killConfirm
          diable
          demonstration
          clips
          tags
          notes
        }
      }
    }
  }
`;
