import React from "react";
import {
  Button,
  Segment,
  Header,
  Icon,
  Label,
  Embed,
  Grid,
  List
} from "semantic-ui-react";

import { generateEffectivePercentages } from "../helpers";
import * as styles from "../styles";
import Input from "./input";
import Tagbar from "./tagbar";

export default function ComboList({ combos }) {
  return (
    <Segment attached basic>
      <Header as="h2" style={styles.fancyText}>
        Combos
      </Header>
      {combos.map(
        (
          {
            input,
            damage,
            diable,
            killConfirm,
            percentages,
            demonstration,
            tags,
            notes
          },
          index
        ) => {
          const allTags = [
            ...(killConfirm ? ["Kill Confirm"] : []),
            `${diable ? "" : "Not"} DI-able`,
            ...(tags || [])
          ];

          return (
            <Segment
              key={input}
              basic
              style={{
                borderBottom:
                  index === combos.length - 1 ? "" : "1px solid #7289D8"
              }}
            >
              <Grid>
                <Grid.Column mobile={16} tablet={16} computer={3}>
                  <Segment basic>
                    <Input input={input} />
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
                  </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={13}>
                  <Segment basic>
                    <Tagbar tags={allTags} />
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
                            <List.Header as="h4">{label}</List.Header>
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
                      <Segment
                        placeholder
                        style={{ width: "100%", height: "90%" }}
                      >
                        <Header icon>
                          <Icon name="warning" />
                          This combo does not have a demonstration.
                          <Button
                            size="large"
                            primary
                            style={{
                              marginTop: "2rem"
                            }}
                          >
                            Upload demonstration
                          </Button>
                        </Header>
                      </Segment>
                    )}
                  </Segment>
                  <Segment basic>
                    <Header as="h3" style={styles.fancyText}>
                      Notes
                    </Header>
                    {notes || "There are no notes on this combo."}
                  </Segment>
                </Grid.Column>
              </Grid>
            </Segment>
          );
        }
      )}
    </Segment>
  );
}
