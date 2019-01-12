import React, { Component } from "react";
import { Link } from "gatsby";
import { Button, Card, Embed, Header, List, Popup } from "semantic-ui-react";

import { copyToClipboard, generateEffectivePercentages } from "../helpers";
import * as styles from "../styles";
import Input from "./input";
import PercentBar from "./percent-bar";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";

export default class ComboListCard extends Component {
  share = () => {
    const { slug, uuid, showMessage } = this.props;
    const url = `https://smashcombos.com/${slug}/combos/${uuid}`;

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
      basic
    } = this.props;
    const linkProps = basic
      ? {
          as: Link,
          to: `/${slug}/combos/${uuid}`
        }
      : {};
    const card = (
      <Card {...linkProps}>
        {/* Input */}
        <Card.Content
          style={{
            position: "relative",
            height: "250px",
            overflowY: "auto"
          }}
        >
          <Input input={input} />
        </Card.Content>
        <>
          {/* Damage */}
          {damage != null && (
            <Card.Content extra>
              <Card.Header
                as="h5"
                content="Damage Dealt"
                style={styles.fancyText}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <PercentBar
                  value={damage}
                  style={{
                    flex: 4,
                    marginBottom: 0
                  }}
                />
                <div
                  style={{
                    ...styles.perfectlyCentered,
                    paddingLeft: "1rem"
                  }}
                >
                  <Header
                    as="h3"
                    content={`${parseFloat(damage).toFixed(1)}%`}
                    textAlign="right"
                    style={{
                      ...styles.fancyText,
                      flex: 1
                    }}
                  />
                </div>
              </div>
            </Card.Content>
          )}
          {!basic && (
            <>
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
              {/* Notes */}
              <Card.Content extra>
                <Card.Header as="h5" content="Notes" style={styles.fancyText} />
                {notes || "There are no notes on this combo."}
              </Card.Content>
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
                    to={`/${slug}/combos/${uuid}/edit`}
                    content="Edit"
                  />
                </Button.Group>
              </Card.Content>
            </>
          )}
        </>
      </Card>
    );

    return (
      <>
        {basic ? (
          <Popup
            inverted
            trigger={card}
            content="View additional information"
          />
        ) : (
          card
        )}
      </>
    );
  }
}
