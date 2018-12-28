import React, { Component } from "react";
import {
  Segment,
  Header,
  Grid,
  Menu,
  Label,
  Icon,
  Statistic
} from "semantic-ui-react";

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
        <Header as="h2" style={{ textTransform: "uppercase" }}>
          Attributes
        </Header>
        <Grid stackable>
          <Grid.Row stretched>
            <Grid.Column width={4}>
              <Menu vertical size="large" fluid>
                {Object.entries(attributeToInformationHash).map(
                  ([key, { name }]) => (
                    <Menu.Item
                      key={name}
                      active={attribute === key}
                      style={{ textTransform: "uppercase" }}
                      onClick={() => this.switchAttribute(key)}
                    >
                      {name}
                    </Menu.Item>
                  )
                )}
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <React.Fragment>
                  <Header as="h3" style={{ textTransform: "uppercase" }}>
                    {name}
                    <Label>
                      <Icon name="trophy" />
                      Rank {rank} of 77
                    </Label>
                  </Header>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Statistic.Group
                      size="large"
                      widths={3}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                      }}
                    >
                      {fields.map(({ label, value }) => (
                        <Statistic key={label} label={label} value={value} />
                      ))}
                    </Statistic.Group>
                  </div>
                </React.Fragment>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
