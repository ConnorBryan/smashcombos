import React, { Component } from "react";
import {
  Segment,
  Header,
  Grid,
  Menu,
  Label,
  List,
  Icon,
  Responsive
} from "semantic-ui-react";

import * as styles from "../styles";
import { AttributeTypes, attributeToInformationHash } from "../helpers";
import KillMovesPanel from "./kill-moves-panel";

export default class AttributePanel extends Component {
  state = {
    attribute: AttributeTypes.AirAcceleration
  };

  switchAttribute = attribute => this.setState({ attribute });

  render() {
    const { attributes } = this.props;
    const { attribute } = this.state;
    const {
      name,
      value: attributeKey,
      fields: attributeFields
    } = attributeToInformationHash[attribute];
    const activeAttribute = attributes[attributeKey];
    const { rank } = activeAttribute;
    const fields = attributeFields.map(({ label, value }) => ({
      label,
      value: activeAttribute[value]
    }));

    return (
      <Segment attached>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Header as="h2" style={{ ...styles.fancyText, color: "#7289D8" }}>
              Attributes
            </Header>
            <Segment basic style={styles.noSidePadding}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Menu vertical size="large" fluid>
                      {Object.entries(attributeToInformationHash).map(
                        ([key, { name }]) => (
                          <Menu.Item
                            key={name}
                            active={attribute === key}
                            style={styles.fancyText}
                            onClick={() => this.switchAttribute(key)}
                          >
                            {name}
                          </Menu.Item>
                        )
                      )}
                    </Menu>
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    style={{
                      minHeight: "310px"
                    }}
                  >
                    <Segment basic>
                      <React.Fragment>
                        <Header as="h3" style={styles.fancyText}>
                          {name}
                        </Header>
                        <List size="huge" relaxed>
                          <List.Item>
                            <Label size="large">
                              <Icon name="trophy" />
                              Rank {rank} of 77
                            </Label>
                          </List.Item>
                          {fields.map(({ label, value }) => (
                            <List.Item
                              key={label}
                              style={{
                                marginBottom: "0.5rem",
                                paddingLeft: "1rem",
                                borderLeft: "1px solid #738BD6"
                              }}
                            >
                              <List.Header>{label}</List.Header>
                              <List.Content>{value}</List.Content>
                            </List.Item>
                          ))}
                        </List>
                      </React.Fragment>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <Responsive as={KillMovesPanel} minWidth={992} basic />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
