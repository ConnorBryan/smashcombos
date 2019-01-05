import React, { Component } from "react";
import { Link } from "gatsby";
import {
  Button,
  Segment,
  Header,
  Label,
  Embed,
  Grid,
  List
} from "semantic-ui-react";

import { generateEffectivePercentages } from "../helpers";
import * as styles from "../styles";
import Input from "./input";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";

export default class ComboListEntry extends Component {
  state = {
    isVisible: true
  };

  toggleVisibility = () =>
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));

  render() {
    const {
      index,
      input,
      damage,
      percentages,
      demonstration,
      tags,
      notes,
      total,
      basic,
      slug
    } = this.props;
    const { isVisible } = this.state;

    return (
      <React.Fragment>
        <Segment
          key={input}
          basic
          style={{
            ...styles.noSidePadding,
            borderBottom: index === total ? "" : "1px solid #7289D8"
          }}
        >
          <Grid>
            {!basic && (
              <Grid.Column
                width={16}
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >
                <Button.Group floated="right">
                  <Button
                    as={Link}
                    to={`/${slug}/edit?tab=editCombos`}
                    style={{
                      width: "8rem",
                      marginRight: "1rem"
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={this.toggleVisibility}
                    style={{
                      width: "8rem"
                    }}
                  >
                    {isVisible ? "Hide" : "Show"}
                  </Button>
                </Button.Group>
              </Grid.Column>
            )}
            <Grid.Column mobile={16} tablet={16} computer={3}>
              <Segment basic>
                <Input input={input} />
                {damage != null && isVisible && (
                  <Label style={{ marginTop: "2rem" }}>
                    {damage}%
                    <Label.Detail
                      style={{
                        textTransform: "uppercase"
                      }}
                    >
                      damage
                    </Label.Detail>
                  </Label>
                )}
              </Segment>
            </Grid.Column>
            {isVisible && (
              <Grid.Column mobile={16} tablet={16} computer={13}>
                <Segment basic>
                  <Tagbar tags={tags || []} />
                </Segment>
                <Segment basic>
                  <Header as="h3" style={styles.fancyText}>
                    Percentages
                  </Header>
                  <List
                    horizontal
                    celled
                    style={{
                      display: "flex",
                      flexWrap: "wrap"
                    }}
                  >
                    {generateEffectivePercentages(percentages).map(
                      ({ label, value }) => (
                        <List.Item
                          key={label}
                          style={{
                            flex: label === "Super Heavyweight" ? 2 : 1,
                            maxWidth: "12rem",
                            marginBottom: "0.2rem"
                          }}
                        >
                          <List.Header
                            as="h4"
                            style={{
                              whiteSpace: "nowrap"
                            }}
                          >
                            {label}
                          </List.Header>
                          <List.Content>{value}</List.Content>
                        </List.Item>
                      )
                    )}
                  </List>
                </Segment>
                <Segment
                  basic
                  style={{
                    maxWidth: "40rem"
                  }}
                >
                  <Header as="h3" style={styles.fancyText}>
                    Demonstration
                  </Header>
                  {demonstration ? (
                    <Embed url={demonstration} />
                  ) : (
                    <PlaceholderPanel
                      action="Upload demonstration"
                      basic={basic}
                    >
                      This combo does not have a demonstration.
                    </PlaceholderPanel>
                  )}
                </Segment>
                <Segment basic>
                  <Header as="h3" style={styles.fancyText}>
                    Notes
                  </Header>
                  {notes || "There are no notes on this combo."}
                </Segment>
              </Grid.Column>
            )}
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}
