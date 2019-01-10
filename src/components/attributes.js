import React, { Component } from "react";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
  Tab
} from "semantic-ui-react";

import { AttributeTypes, attributeToInformationHash } from "../helpers";
import kuroganeHammer from "../img/kurogane-hammer.png";
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
                <React.Fragment>
                  <Icon name="trophy" /> Rank
                </React.Fragment>
              }
            />
            <List.Content
              content={`${rank} of 76`}
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
        <Grid>
          <Grid.Column mobile={16} tablet={9} computer={9}>
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
                style={{
                  marginBottom: "3rem"
                }}
              />
            </div>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={7}
            computer={7}
            verticalAlign="middle"
          >
            <Card
              fluid
              style={{
                background: "#eee"
              }}
            >
              <Image src={kuroganeHammer} alt="Kurogane Hammer logo" />
              <Card.Content
                content="Character attributes sourced from KuroganeHammer, with permission."
                textAlign="center"
              />
              <Card.Content
                extra
                style={{
                  padding: 0
                }}
              >
                <Button
                  primary
                  fluid
                  as="a"
                  href="http://kuroganehammer.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  content="Check them out"
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
