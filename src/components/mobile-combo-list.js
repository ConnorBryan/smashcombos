import React from "react";
import {
  Card,
  Grid,
  Statistic,
  Label,
  Header,
  Embed,
  Segment
} from "semantic-ui-react";

import { generateEffectivePercentages } from "../helpers";
import ComboDemonstrationPlaceholder from "./combo-demonstration-placeholder";
import Input from "./input";

export default function MobileComboList({ combos }) {
  return (
    <Segment attached>
      <Header as="h2" style={{ textTransform: "uppercase" }}>
        Combos
      </Header>
      <Card.Group>
        {combos.map(
          ({
            input,
            percentages,
            damage,
            diable,
            killConfirm,
            demonstration = "",
            clips,
            notes,
            tags
          }) => (
            <Card key={input} fluid>
              <Card.Content>
                <Grid>
                  <Grid.Column
                    width={8}
                    style={{
                      borderRight: "1px solid #738BD6"
                    }}
                  >
                    <Input input={input} />
                  </Grid.Column>
                  <Grid.Column
                    width={8}
                    floated="right"
                    style={{ paddingRight: "1rem" }}
                  >
                    <Statistic.Group size="tiny" widths={1}>
                      {generateEffectivePercentages(percentages).map(
                        ({ label, value }) => (
                          <Statistic key={label} label={label} value={value} />
                        )
                      )}
                    </Statistic.Group>
                  </Grid.Column>
                </Grid>
              </Card.Content>
              <Card.Content extra>
                <Label as="h4" style={{ textTransform: "uppercase" }}>
                  Deals {damage}% damage
                </Label>
                {killConfirm && (
                  <Label as="h4" style={{ textTransform: "uppercase" }}>
                    Kill confirm
                  </Label>
                )}
                <Label as="h4" style={{ textTransform: "uppercase" }}>
                  {diable ? "" : "Not"} DI-able
                </Label>
              </Card.Content>
              <Card.Content extra>
                <Header as="h4" style={{ textTransform: "uppercase" }}>
                  Demonstration
                </Header>
                {demonstration ? (
                  <Embed url={demonstration} />
                ) : (
                  <ComboDemonstrationPlaceholder />
                )}
              </Card.Content>
              {(clips || []).length > 0 && (
                <Card.Content extra>
                  <Header as="h4" style={{ textTransform: "uppercase" }}>
                    Clips
                  </Header>
                  {clips.map(({ description, credit, link }) => (
                    <React.Fragment key={link}>
                      <Embed url={link} />
                      <Card.Description>
                        <Label style={{ marginTop: "1rem", width: "100%" }}>
                          {description} Credit to {credit}.
                        </Label>
                      </Card.Description>
                    </React.Fragment>
                  ))}
                </Card.Content>
              )}
              <Card.Content extra>
                <Header as="h4" style={{ textTransform: "uppercase" }}>
                  Tags
                </Header>
                {(tags || []).map(tag => (
                  <Label key={tag}>{tag}</Label>
                ))}
              </Card.Content>
              <Card.Content extra>
                <Header as="h4" style={{ textTransform: "uppercase" }}>
                  Notes
                </Header>
                {notes || "There are no notes on this combo."}
              </Card.Content>
            </Card>
          )
        )}
      </Card.Group>
    </Segment>
  );
}
