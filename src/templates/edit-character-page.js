import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import { Tab } from "semantic-ui-react";
import queryString from "query-string";

import {
  AddComboTab,
  CharacterPortrait,
  EditCombosTab,
  EditProfileTab,
  Layout
} from "../components";
import { getCharacter, getCharacterRender } from "../helpers";

export default class EditCharacterPage extends Component {
  constructor(props) {
    super(props);

    const {
      location: { search }
    } = props;
    const { tab } = queryString.parse(search);
    const tabOrder = ["editProfile", "editCombos", "addCombo"];

    this.state = {
      activeIndex: tab ? tabOrder.indexOf(tab) : 0
    };
  }

  handleTabChange = (_, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const { data } = this.props;
    const { activeIndex } = this.state;
    const character = getCharacter(data);
    const image = getCharacterRender(character);
    const {
      name,
      slug,
      attributes: {
        weight: { class: weightClass }
      },
      description,
      tags,
      combos
    } = character;
    const panes = [
      {
        menuItem: {
          key: "editProfile",
          icon: "user",
          content: "Profile"
        },
        render: () => (
          <Tab.Pane>
            <EditProfileTab
              slug={slug}
              name={name}
              image={image}
              weightClass={weightClass}
              description={description}
              tags={tags}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: "editCombos",
          icon: "pencil",
          content: "Edit Combos"
        },
        render: () => (
          <Tab.Pane>
            <EditCombosTab combos={combos} />
          </Tab.Pane>
        )
      },
      {
        menuItem: {
          key: "addCombo",
          icon: "plus",
          content: "Add Combo"
        },
        render: () => (
          <Tab.Pane>
            <AddComboTab />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Layout>
        <Link to={slug}>
          <CharacterPortrait
            name={`Editing ${name}`}
            image={image}
            style={{
              marginBottom: "2rem"
            }}
          />
        </Link>
        <Tab
          className="mobile-only"
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
          menu={{
            style: {
              display: "flex",
              flexDirection: "column"
            }
          }}
          panes={panes}
          style={{
            marginBottom: "3rem",
            border: "none"
          }}
        />
        <Tab
          className="desktop-only"
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
          panes={panes}
          style={{
            marginBottom: "3rem"
          }}
        />
      </Layout>
    );
  }
}

export const editCharacterPageQuery = graphql`
  query EditCharacterPageQuery($id: String!) {
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
      description
      tags
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
        demonstration
        tags
        notes
      }
    }
  }
`;
