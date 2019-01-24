import React from "react";
import { Link, graphql } from "gatsby";
import { Card } from "semantic-ui-react";

import { CharacterPortrait, ComboListCard } from "../components";
import { getCharacter, getCharacterRender } from "../helpers";
import { Layout } from "../modules";
import { MessageContext } from "../providers";

export default function ViewComboPage({
  navigate,
  data,
  pageContext: { uuid }
}) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, slug, combos } = character;
  const combo = combos.find(entry => entry.uuid === uuid);

  return (
    <Layout navigate={navigate}>
      <Link to={slug}>
        <CharacterPortrait
          name={`Viewing ${name}'s combo`}
          image={image}
          style={{
            marginBottom: "2rem"
          }}
        />
      </Link>
      <Card.Group
        itemsPerRow={1}
        style={{
          marginBottom: "3rem"
        }}
      >
        <MessageContext.Consumer>
          {({ showMessage }) => (
            <ComboListCard
              {...combo}
              slug={slug}
              total={combos.length - 1}
              showMessage={showMessage}
            />
          )}
        </MessageContext.Consumer>
      </Card.Group>
    </Layout>
  );
}

export const viewComboPageQuery = graphql`
  query ViewComboPageQuery($id: String!) {
    charactersJson(id: { eq: $id }) {
      name
      slug
      render {
        childImageSharp {
          fluid(maxWidth: 1075, quality: 72) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      combos {
        uuid
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
        demonstration
        tags
        notes
      }
    }
  }
`;
