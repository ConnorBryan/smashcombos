import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import { Tab } from "semantic-ui-react";
import queryString from "query-string";

import {
  AddComboTab,
  AuthRedirect,
  CharacterPortrait,
  EditProfileTab
} from "../components";
import { MessageContext } from "../components/message-provider";
import { getCharacter, getCharacterRender } from "../helpers";

export default class EditCharacterPage extends Component {
  state = {
    activeIndex: 0
  };

  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const { tab } = queryString.parse(search);
    const tabOrder = ["editProfile", "addCombo"];

    if (tab) {
      this.setState({
        activeIndex: tabOrder.indexOf(tab)
      });
    }
  }

  handleTabChange = (_, { activeIndex }) => this.setState({ activeIndex });

  render() {
    const { data, navigate, pathname } = this.props;
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
      tags
    } = character;
    const panes = [
      {
        menuItem: {
          key: "editProfile",
          icon: "user",
          content: "Edit Profile"
        },
        render: () => (
          <Tab.Pane>
            <MessageContext.Consumer>
              {({ showMessage }) => (
                <EditProfileTab
                  slug={slug}
                  name={name}
                  image={image}
                  weightClass={weightClass}
                  description={description}
                  tags={tags}
                  showMessage={showMessage}
                />
              )}
            </MessageContext.Consumer>
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
            <MessageContext.Consumer>
              {({ showMessage }) => (
                <AddComboTab character={character} showMessage={showMessage} />
              )}
            </MessageContext.Consumer>
          </Tab.Pane>
        )
      }
    ];

    return (
      <AuthRedirect
        navigate={navigate}
        message={`Adding a combo for ${name} requires a SmashCombos account.`}
        redirect={pathname}
      >
        <Link to={slug}>
          <CharacterPortrait
            name={`Editing ${name}'s profile`}
            image={image}
            style={{
              marginBottom: "2rem"
            }}
          />
        </Link>
        <div className="mobile-only">
          <Tab
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
        </div>
        <div className="desktop-only">
          <Tab
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
            panes={panes}
            style={{
              marginBottom: "3rem"
            }}
          />
        </div>
      </AuthRedirect>
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
