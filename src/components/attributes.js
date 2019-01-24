import React, { Component } from "react";
import { Dropdown, Header, Icon, List, Segment, Tab } from "semantic-ui-react";

import { AttributeTypes, attributeToInformationHash } from "../constants";
import * as styles from "../styles";

export default class Attributes extends Component {
  static Box({ attribute, header, rank, fields }) {
    return (
      <Segment basic>
        <Header
          as="h3"
          style={{
            ...styles.fancyText,
            marginBottom: 0
          }}
          content={header}
        />
        <List
          divided
          size="large"
          style={{
            height: "187px"
          }}
        >
          {fields.map(({ label, value }, index) => (
            <List.Item
              key={index}
              style={{
                flex: 1,
                display: "flex",
                padding: "1rem 0"
              }}
            >
              <List.Header content={label} />
              <List.Content
                content={attribute[value]}
                style={{
                  flex: 1,
                  textAlign: "right"
                }}
              />
            </List.Item>
          ))}
          <List.Item
            style={{
              flex: 1,
              display: "flex",
              padding: "1rem 0"
            }}
          >
            <List.Header
              content={
                <>
                  <Icon name="trophy" /> Rank
                </>
              }
            />
            <List.Content
              content={`${rank} of 77`}
              style={{
                flex: 1,
                textAlign: "right"
              }}
            />
          </List.Item>
        </List>
      </Segment>
    );
  }

  state = {
    attribute: AttributeTypes.AirAcceleration
  };

  switchAttribute = (_, { value }) => this.setState({ attribute: value });

  render() {
    const { attributes } = this.props;
    const { attribute } = this.state;

    return (
      <Segment basic>
        <Header
          as="h2"
          style={{
            ...styles.fancyText,
            marginBottom: 0,
            color: "#7289D8"
          }}
        >
          Attributes
        </Header>
        <p
          style={{
            ...styles.fancyPanel,
            marginTop: "1rem",
            marginBottom: "2rem",
            fontSize: "1.2rem"
          }}
        >
          Statistic information available across a range of categories.
        </p>
        <div className="mobile-only">
          <Dropdown
            fluid
            attached="top"
            selection
            value={attribute}
            onChange={this.switchAttribute}
            options={Object.entries(attributeToInformationHash).map(
              ([key, { name, value }]) => ({
                key,
                text: name,
                value
              })
            )}
          />
          <Segment attached="bottom">
            <Attributes.Box
              attribute={attributes[attribute]}
              header={attributeToInformationHash[attribute].name}
              rank={attributes[attribute].rank}
              fields={attributeToInformationHash[attribute].fields}
            />
          </Segment>
        </div>
        <div className="desktop-only">
          <Tab
            className="attributes"
            menu={{
              fluid: true,
              vertical: true,
              tabular: true
            }}
            panes={Object.entries(attributeToInformationHash).map(
              ([key, { name, value: type, fields }]) => ({
                menuItem: name,
                render: () => (
                  <Tab.Pane>
                    <Attributes.Box
                      attribute={attributes[type]}
                      header={name}
                      rank={attributes[type].rank}
                      fields={fields}
                    />
                  </Tab.Pane>
                )
              })
            )}
          />
        </div>
      </Segment>
    );
  }
}
