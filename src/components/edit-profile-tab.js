import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

import { tagTypeToTag } from "../helpers";
import { CharacterService } from "../services";
import ConfirmChanges from "./confirm-changes";
import Profile from "./profile";

export default class EditProfileTab extends Component {
  state = {
    profile: {
      description: this.props.description || "",
      tags: this.props.tags || []
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

  continue = async () => {
    const { name, slug, navigate } = this.props;
    const {
      profile: { description, tags }
    } = this.state;
    const success = await CharacterService.editProfile(slug, description, tags);

    navigate(slug, {
      state: {
        message: success
          ? `Successfully edited ${name}'s profile.`
          : `Unable to edit ${name}'s profile. Please try again later.`
      }
    });
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
      <React.Fragment>
        {confirming ? (
          <ConfirmChanges
            title="profile"
            onMakeChanges={this.toggleConfirming}
            onContinue={this.continue}
          >
            <Profile
              basic
              slug={slug}
              name={name}
              image={image}
              description={description}
              tags={tags}
              weightClass={weightClass}
            />
          </ConfirmChanges>
        ) : (
          <Formik
            initialValues={{
              description,
              tags: tagHash
            }}
            onSubmit={this.updateProfile}
            render={({ handleReset, handleSubmit }) => (
              <Segment basic>
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
              </Segment>
            )}
          />
        )}
      </React.Fragment>
    );
  }
}
