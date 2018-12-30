import React, { Component } from "react";
import {
  Segment,
  Header,
  Grid,
  Menu,
  Label,
  List,
  Icon
} from "semantic-ui-react";

import * as styles from "../styles";
import { AttributeTypes, attributeToInformationHash } from "../helpers";

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
        <Header as="h2" style={styles.fancyText}>
          Attributes
        </Header>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
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
            <Grid.Column width={12}>
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
                      <List.Item key={label}>
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
    );
  }
}
