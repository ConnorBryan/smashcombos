import React from "react";
import { Link, graphql } from "gatsby";

import { CharacterPortrait, ComboInterface } from "../components";
import { getCharacter, getCharacterRender } from "../helpers";
import { Layout } from "../modules";
import { MessageContext } from "../providers";
import { CharacterService } from "../services";
import { AuthRedirect } from "../utils";

export default function EditComboPage({
  data,
  pageContext: { uuid },
  navigate,
  location: { pathname }
}) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, slug, combos } = character;
  const combo = combos.find(entry => entry.uuid === uuid);

  return (
    <Layout navigate={navigate}>
      <AuthRedirect
        navigate={navigate}
        message={`Editing one of ${name}'s combos requires a SmashCombos account.`}
        redirect={pathname}
      >
        <Link to={slug}>
          <CharacterPortrait
            name={`Editing ${name}'s combo`}
            image={image}
            style={{
              marginBottom: "2rem"
            }}
          />
        </Link>
        <MessageContext.Consumer>
          {({ showMessage }) => (
            <ComboInterface
              combo={combo}
              onContinue={async (combo, toggleConfirming) => {
                const success = await CharacterService.editCombo(
                  slug,
                  uuid,
                  combo
                );

                showMessage(
                  success
                    ? {
                        header: `Successfully edited one of ${name}'s combos.`,
                        content:
                          "The change will be reviewed as soon as possible."
                      }
                    : {
                        header: `Unable to edit one of ${name}'s combos.`,
                        content: "Please try again later."
                      }
                );

                toggleConfirming();
              }}
            />
          )}
        </MessageContext.Consumer>
      </AuthRedirect>
    </Layout>
  );
}

export const editComboPageQuery = graphql`
  query EditComboPageQuery($id: String!) {
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
