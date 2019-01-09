import React, { Component } from "react";
import { Link } from "gatsby";
import { Button, Card, Embed, Label, List, Ref } from "semantic-ui-react";

import { copyToClipboard, generateEffectivePercentages } from "../helpers";
import * as styles from "../styles";
import Input from "./input";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";

export default class ComboListCard extends Component {
  state = {
    isVisible: true
  };

  toggleVisibility = () =>
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));

  share = () => {
    const { slug, uuid, showMessage } = this.props;
    const url = `https://smashcombos.com/${slug}?combo=${uuid}`;

    copyToClipboard(url);

    showMessage({
      header: `Copied shareable link for this combo.`,
      content: `Paste from the clipboard to share the link.`
    });
  };

  render() {
    const {
      input,
      damage,
      slug,
      uuid,
      tags,
      percentages,
      demonstration,
      notes,
      comboRef
    } = this.props;
    const { isVisible } = this.state;

    return (
      <Ref innerRef={comboRef}>
        <Card
          style={{
            height: isVisible ? "auto" : "200px"
          }}
        >
          {/* Input */}
          <Card.Content
            style={{
              position: "relative",
              height: "250px",
              overflowY: "auto"
            }}
          >
            <Input input={input} />
            <Button
              onClick={this.toggleVisibility}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem"
              }}
            >
              {isVisible ? "Hide" : "Show"}
            </Button>
          </Card.Content>
          {isVisible && (
            <React.Fragment>
              {/* Damage */}
              {damage != null && isVisible && (
                <Card.Content extra>
                  <Label
                    size="large"
                    style={{
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    {damage}%
                    <Label.Detail
                      style={{
                        textTransform: "uppercase"
                      }}
                    >
                      damage
                    </Label.Detail>
                  </Label>
                </Card.Content>
              )}
              {/* Actions */}
              <Card.Content extra>
                <Button.Group widths={2}>
                  <Button
                    onClick={this.share}
                    content="Share"
                    style={{
                      marginRight: "10px",
                      marginLeft: "-5px"
                    }}
                  />
                  <Button
                    as={Link}
                    to={`/${slug}/combos/${uuid}`}
                    content="Edit"
                  />
                </Button.Group>
              </Card.Content>
              {/* Tags */}
              <Card.Content
                extra
                style={{
                  height: "92px"
                }}
              >
                <Card.Header as="h5" content="Tags" style={styles.fancyText} />
                <Tagbar labeled={false} tags={tags} />
              </Card.Content>
              {/* Percentages */}
              <Card.Content extra>
                <Card.Header
                  as="h5"
                  content="Percentages"
                  style={styles.fancyText}
                />
                <List divided size="large">
                  {generateEffectivePercentages(percentages).map(
                    ({ label: header, value: content }) => (
                      <List.Item
                        key={header}
                        style={{
                          flex: 1,
                          display: "flex",
                          padding: "0.5rem 0"
                        }}
                      >
                        <List.Header content={header} />
                        <List.Content
                          content={content}
                          style={{
                            flex: 1,
                            textAlign: "right"
                          }}
                        />
                      </List.Item>
                    )
                  )}
                </List>
              </Card.Content>
              {/* Demonstration */}
              <Card.Content extra>
                <Card.Header
                  as="h5"
                  content="Demonstration"
                  style={styles.fancyText}
                />
                {demonstration ? (
                  <Embed url={demonstration} />
                ) : (
                  <PlaceholderPanel basic>
                    This combo does not have a demonstration.
                  </PlaceholderPanel>
                )}
              </Card.Content>
              {/* Notes */}
              <Card.Content
                extra
                style={{
                  height: "150px",
                  overflowY: "auto"
                }}
              >
                <Card.Header as="h5" content="Notes" style={styles.fancyText} />
                {notes || "There are no notes on this combo."}
              </Card.Content>
            </React.Fragment>
          )}
        </Card>
      </Ref>
    );
  }
}
