import React, { Component } from "react";
import { Link } from "gatsby";
import { Button, Card, Header, Icon, Segment } from "semantic-ui-react";
import queryString from "query-string";

import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";
import ComboListCard from "./combo-list-card";
import { MessageContext } from "./message-provider";

export default class ComboList extends Component {
  comboRefs = this.props.combos.reduce((prev, next) => {
    prev[next.uuid] = React.createRef();
    return prev;
  }, {});

  componentDidMount() {
    setTimeout(this.scrollToCombo, 1000);
  }

  scrollToCombo = () => {
    const { query } = this.props;
    const { combo } = queryString.parse(query);

    if (combo) {
      this.comboRefs[combo].current.scrollIntoView();
      window.scrollBy(0, -100);
    }
  };

  render() {
    const { slug, combos } = this.props;

    return (
      <React.Fragment>
        <Segment basic>
          <React.Fragment>
            <Header as="h2" style={{ ...styles.fancyText, color: "#7289D8" }}>
              Combos
            </Header>
            <Segment basic>
              {combos.length > 0 ? (
                <Card.Group itemsPerRow={2} stackable>
                  <MessageContext.Consumer>
                    {({ showMessage }) =>
                      combos.map((combo, index) => (
                        <ComboListCard
                          key={combo.input}
                          {...combo}
                          slug={slug}
                          total={combos.length - 1}
                          index={index}
                          comboRef={this.comboRefs[combo.uuid]}
                          showMessage={showMessage}
                        />
                      ))
                    }
                  </MessageContext.Consumer>
                </Card.Group>
              ) : (
                <PlaceholderPanel icon="plus" basic>
                  This character doesn't have any listed combos.
                </PlaceholderPanel>
              )}
            </Segment>
          </React.Fragment>
        </Segment>
        <Link to={`/${slug}/edit?tab=addCombo`}>
          <Button
            icon
            primary
            size="huge"
            attached="bottom"
            style={{
              ...styles.fancyText,
              marginBottom: "3rem"
            }}
          >
            <Icon name="plus" /> Add a combo
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}
