import React from "react";
import { graphql, Link } from "gatsby";

import { getCharacter, getCharacterRender } from "../helpers";
import downRightArrow from "../img/down-right-arrow.svg";
import {
  Button,
  CharacterCard,
  Grouping,
  Layout,
  Panel,
  Value
} from "../components";
import "./character-page.scss";

const Arrow = () => (
  <img
    className="Arrow"
    src={downRightArrow}
    alt="down, right arrow"
    width="20"
    height="20"
  />
);

const DecoratedInput = ({ input }) => {
  if (!input) {
    return null;
  }

  const inputs = input.split(" ");

  if (input.length === 1) {
    return <h2>{input}</h2>;
  }

  const [initial, ...others] = inputs;

  return (
    <div className="DecoratedInput">
      <h2>Inputs</h2>
      <h2>{initial}</h2>
      {others.map((input, index) => (
        <div key={index} className="DecoratedInput-entry">
          <Arrow />
          {input}
        </div>
      ))}
    </div>
  );
};

export default function CharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, attributes, killConfirms, combos } = character;
  const hasKillConfirms = killConfirms.length > 0;
  const hasCombos = combos.length > 0;

  return (
    <Layout>
      <section className="CharacterPage">
        <CharacterCard
          name={name}
          image={image}
          attributes={attributes}
          killConfirms={killConfirms}
          combos={combos}
        />
        <Grouping title="Kill Confirms">
          {hasKillConfirms ? (
            killConfirms.map(
              ({
                input,
                percentages: {
                  balloonweight,
                  featherweight,
                  lightweight,
                  middleweight,
                  heavyweight,
                  superHeavyweight
                }
              }) => (
                <Panel key={input} className="CharacterPage-blockGroup">
                  <div className="CharacterPage-blockGroup-input">
                    <DecoratedInput input={input} />
                  </div>
                  <div className="CharacterPage-blockGroup-percentages" />
                  <ul>
                    <li>
                      <Value label="Balloonweight">{balloonweight}%</Value>
                    </li>
                    <li>
                      <Value label="Featherweight">{featherweight}%</Value>
                    </li>
                    <li>
                      <Value label="Lightweight">{lightweight}%</Value>
                    </li>
                    <li>
                      <Value label="Middleweight">{middleweight}%</Value>
                    </li>
                    <li>
                      <Value label="Super Heavyweight">
                        {superHeavyweight}%
                      </Value>
                    </li>
                  </ul>
                </Panel>
              )
            )
          ) : (
            <Panel>This character has no listed kill confirms.</Panel>
          )}
        </Grouping>
        <Grouping title="Combos">
          {hasCombos ? (
            combos.map(
              ({
                input,
                percentages: {
                  balloonweight,
                  featherweight,
                  lightweight,
                  middleweight,
                  heavyweight,
                  superHeavyweight
                }
              }) => (
                <Panel key={input} className="CharacterPage-blockGroup">
                  <div className="CharacterPage-blockGroup-input">
                    <DecoratedInput input={input} />
                  </div>
                  <div className="CharacterPage-blockGroup-percentages">
                    <ul>
                      <li>
                        <Value label="Balloonweight">{balloonweight}%</Value>
                      </li>
                      <li>
                        <Value label="Featherweight">{featherweight}%</Value>
                      </li>
                      <li>
                        <Value label="Lightweight">{lightweight}%</Value>
                      </li>
                      <li>
                        <Value label="Middleweight">{middleweight}%</Value>
                      </li>
                      <li>
                        <Value label="Super Heavyweight">
                          {superHeavyweight}%
                        </Value>
                      </li>
                    </ul>
                  </div>
                </Panel>
              )
            )
          ) : (
            <Panel>This character has no listed combos.</Panel>
          )}
        </Grouping>
        <div className="CharacterPage-back">
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </div>
      </section>
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
        attributes {
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
            superHeavyweight
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
            superHeavyweight
          }
        }
      }
    }
  }
`;
