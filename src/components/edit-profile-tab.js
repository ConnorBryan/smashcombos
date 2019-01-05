import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

import * as styles from "../styles";
import { tagTypeToTag } from "../helpers";
import Profile from "./profile";

export default class EditProfileTab extends Component {
  state = {
    profile: {
      description: this.props.description,
      tags: this.props.tags
    },
    confirming: false
  };

  toggleConfirming = () =>
    this.setState(prevState => ({
      confirming: !prevState.confirming
    }));

  updateProfile = values => {
    const actualValues = {
      ...values,
      tags: Object.entries(values.tags)
        .map(([key, value]) => value && key)
        .filter(Boolean)
    };

    this.setState({
      profile: actualValues
    });
    this.toggleConfirming();
  };

  continue = () => {
    // Pass
  };

  render() {
    const { slug, name, image, weightClass } = this.props;
    const {
      profile: { description, tags },
      confirming
    } = this.state;
    const tagHash = tags.reduce((prev, next) => {
      prev[next] = true;
      return prev;
    }, {});

    return (
      <Segment basic>
        {confirming ? (
          <React.Fragment>
            <Header as="h2" style={styles.fancyText}>
              Verify profile
            </Header>
            <p>
              Does this look good? If so, press "Continue" below. If not, press
              "Make changes" to update the profile.
            </p>
            <Button.Group>
              <Button onClick={this.toggleConfirming}>Make changes</Button>
              <Button onClick={this.continue} primary>
                Continue
              </Button>
            </Button.Group>
            <Profile
              basic
              slug={slug}
              name={name}
              image={image}
              description={description}
              tags={tags}
              weightClass={weightClass}
            />
          </React.Fragment>
        ) : (
          <Formik
            initialValues={{
              description,
              tags: tagHash
            }}
            onSubmit={this.updateProfile}
            render={({ handleReset, handleSubmit }) => (
              <Form onReset={handleReset} onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <Field
                      name="description"
                      render={({ field, form }) => (
                        <Form.TextArea
                          {...field}
                          label="Description"
                          spellCheck={false}
                          style={{
                            width: "100%",
                            height: "15rem"
                          }}
                        />
                      )}
                    />
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >
                    <Form.Group grouped>
                      <label>Tags</label>
                      {["fastFaller", "floatie", "bigBody"].map(tag => (
                        <Field
                          key={tag}
                          name={`tags.${tag}`}
                          render={({ field, form }) => (
                            <Form.Checkbox
                              checked={field.value}
                              label={tagTypeToTag[tag]}
                              onChange={(_, { checked }) =>
                                form.setFieldValue(`tags.${tag}`, checked)
                              }
                            />
                          )}
                        />
                      ))}
                    </Form.Group>
                    <Button.Group widths={2} fluid>
                      <Button type="reset">Reset</Button>
                      <Button type="submit" primary>
                        Confirm
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid>
              </Form>
            )}
          />
        )}
      </Segment>
    );
  }
}
