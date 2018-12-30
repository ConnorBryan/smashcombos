import React from "react";
import {
  Segment,
  Header,
  Label,
  Statistic,
  Embed,
  Card
} from "semantic-ui-react";

import { generateEffectivePercentages } from "../helpers";
import * as styles from "../styles";
import ComboDemonstrationPlaceholder from "./combo-demonstration-placeholder";
import Input from "./input";

export default function DesktopComboList({ combos }) {
  return (
    <Segment attached>
      <Header as="h2" style={styles.fancyText}>
        Combos
      </Header>
      <Segment.Group
        style={{
          border: "none",
          boxShadow: "none"
        }}
      >
        {combos.map(
          ({
            input,
            percentages,
            damage,
            killConfirm,
            diable,
            demonstration = "",
            clips,
            notes,
            tags
          }) => (
            <Segment key={input} basic>
              <Segment.Group
                horizontal
                style={{
                  marginBottom: 0,
                  borderBottom: "none",
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0
                }}
              >
                <Segment
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Input input={input} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%"
                    }}
                  >
                    <Label
                      as="h4"
                      style={{
                        width: "100%",
                        margin: 0,
                        marginBottom: "0.5rem",
                        textTransform: "uppercase"
                      }}
                    >
                      Deals {damage}% damage
                    </Label>
                    {killConfirm && (
                      <Label
                        as="h4"
                        style={{
                          width: "100%",
                          margin: 0,
                          marginBottom: "0.5rem",
                          textTransform: "uppercase"
                        }}
                      >
                        Kill confirm
                      </Label>
                    )}
                    <Label
                      as="h4"
                      style={{
                        width: "100%",
                        margin: 0,
                        textTransform: "uppercase"
                      }}
                    >
                      {diable ? "" : "Not"} DI-able
                    </Label>
                  </div>
                </Segment>
                <Segment
                  style={{
                    flex: 1
                  }}
                >
                  <Statistic.Group size="tiny" widths={1}>
                    {generateEffectivePercentages(percentages).map(
                      ({ label, value }) => (
                        <Statistic key={label} label={label} value={value} />
                      )
                    )}
                  </Statistic.Group>
                </Segment>
                <Segment
                  style={{
                    flex: 2
                  }}
                >
                  <Header as="h4" style={{ textTransform: "uppercase" }}>
                    Demonstration
                  </Header>
                  {demonstration ? (
                    <Embed url={demonstration} />
                  ) : (
                    <ComboDemonstrationPlaceholder />
                  )}
                </Segment>
                {(clips || []).length > 0 && (
                  <Segment
                    style={{
                      flex: 1
                    }}
                  >
                    <Header as="h4" style={{ textTransform: "uppercase" }}>
                      Clips
                    </Header>
                    {[].map(({ description, credit, link }) => (
                      <React.Fragment key={link}>
                        <Embed url={link} />
                        <Card.Description>
                          <Label style={{ marginTop: "1rem", width: "100%" }}>
                            {description} Credit to {credit}.
                          </Label>
                        </Card.Description>
                      </React.Fragment>
                    ))}
                  </Segment>
                )}
              </Segment.Group>
              <Segment.Group
                horizontal
                style={{ marginTop: 0, borderRadius: 0 }}
              >
                <Segment
                  style={{
                    flex: 1,
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap"
                  }}
                >
                  <Header as="h4" style={{ textTransform: "uppercase" }}>
                    Tags
                  </Header>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0
                    }}
                  >
                    {[].map(tag => (
                      <Label as="li" key={tag}>
                        {tag}
                      </Label>
                    ))}
                  </ul>
                </Segment>
                <Segment style={{ flex: 1 }}>
                  <Header as="h4" style={{ textTransform: "uppercase" }}>
                    Notes
                  </Header>
                  {notes || "There are no notes on this combo."}
                </Segment>
              </Segment.Group>
            </Segment>
          )
        )}
      </Segment.Group>
    </Segment>
  );
}
