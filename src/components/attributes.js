import React, { Component } from "react";
import {
  Dropdown,
  Header,
  Icon,
  Label,
  List,
  Segment,
  Tab
} from "semantic-ui-react";

import { AttributeTypes, attributeToInformationHash } from "../helpers";
import * as styles from "../styles";

export default class Attributes extends Component {
  static Box({ attribute, header, rank, fields }) {
    return (
      <React.Fragment>
        <Header as="h3" style={styles.fancyText} content={header} />
        <Label
          ribbon="right"
          content={
            <span>
              <Icon name="trophy" /> Rank {rank} of 76
            </span>
          }
        />
        <List divided size="large">
          {fields.map(({ label, value }) => (
            <List.Item
              key={label}
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
        </List>
      </React.Fragment>
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
            marginBottom: "2rem",
            color: "#7289D8"
          }}
        >
          Attributes
        </Header>
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
            style={{
              maxWidth: "700px",
              marginBottom: "3rem"
            }}
          />
        </div>
      </Segment>
    );
  }
}
