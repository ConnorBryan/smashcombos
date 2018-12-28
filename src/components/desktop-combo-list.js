import React from "react";
import {
  Segment,
  Header,
  Label,
  Statistic,
  Embed,
  Card
} from "semantic-ui-react";

import Input from "./input";

export default function DesktopComboList({ combos }) {
  return (
    <Segment attached>
      <Header as="h2" style={{ textTransform: "uppercase" }}>
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
            clips = [],
            notes,
            tags = []
          }) => (
            <Segment key={input} basic>
              <Segment.Group
                horizontal
                style={{ marginBottom: 0, borderBottom: "none" }}
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
                  <Statistic.Group size="mini" widths={1}>
                    <Statistic
                      label="Balloonweight"
                      value={`${percentages.balloonweight}%`}
                    />
                    <Statistic
                      label="Featherweight"
                      value={`${percentages.featherweight}%`}
                    />
                    <Statistic
                      label="Lightweight"
                      value={`${percentages.lightweight}%`}
                    />
                    <Statistic
                      label="Middleweight"
                      value={`${percentages.middleweight}%`}
                    />
                    <Statistic
                      label="Heavyweight"
                      value={`${percentages.heavyweight}%`}
                    />
                    <Statistic
                      label="Super Heavyweight"
                      value={`${percentages.superheavyweight}%`}
                    />
                  </Statistic.Group>
                </Segment>
                {demonstration && (
                  <Segment
                    style={{
                      flex: 1
                    }}
                  >
                    <Header as="h4" style={{ textTransform: "uppercase" }}>
                      Demonstration
                    </Header>
                    <Embed url={demonstration} />
                  </Segment>
                )}
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
              <Segment.Group horizontal style={{ marginTop: 0 }}>
                <Segment style={{ flex: 1 }}>
                  <Header as="h4" style={{ textTransform: "uppercase" }}>
                    Notes
                  </Header>
                  {notes}
                </Segment>
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
              </Segment.Group>
            </Segment>
          )
        )}
      </Segment.Group>
    </Segment>
  );
}
