import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import { Formik, Field } from "formik";
import {
  Form,
  TextArea,
  Header,
  Button,
  Checkbox,
  Input,
  Segment,
  Icon
} from "semantic-ui-react";

import { Layout } from "../components";
import {
  getCharacter,
  getCharacterRender,
  tagTypeToTag,
  weightClassLabelsAndValues
} from "../helpers";
import * as styles from "../styles";

const CharacterFieldHeader = ({ children }) => (
  <Header as="h3" style={styles.fancyText}>
    {children}
  </Header>
);

const ComboFieldHeader = ({ children }) => (
  <Header as="h4" style={styles.fancyText}>
    {children}
  </Header>
);

export default function EditCharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, description, tags, combos } = character;
  const characterTagTypes = ["floatie", "fastFaller", "bigBody"];
  const comboTagTypes = [...characterTagTypes, "diable", "killConfirm"];

  return (
    <Layout>
      <Formik
        initialValues={{
          description,
          tags: {
            fastFaller: tags.includes("fastFaller"),
            floatie: tags.includes("floatie"),
            bigBody: tags.includes("bigBody")
          },
          combos: combos.map(combo => ({
            ...combo,
            damage: combo.damage || "0",
            tags: {
              killConfirm: (combo.tags || []).includes("killConfirm"),
              diable: (combo.tags || []).includes("diable"),
              fastFaller: (combo.tags || []).includes("fastFaller"),
              floatie: (combo.tags || []).includes("floatie"),
              bigBody: (combo.tags || []).includes("bigBody")
            },
            demonstration: combo.demonstration || "",
            notes: combo.notes || ""
          }))
        }}
        onSubmit={console.log}
        render={({
          handleSubmit,
          handleReset,
          handleChange,
          setFieldValue,
          values
        }) => (
          <Segment>
            <Header as="h1" style={styles.fancyText}>
              Editing {name}
            </Header>
            <Image
              fluid={image.childImageSharp.fluid}
              style={{ width: "256px", marginBottom: "3rem" }}
            />
            <Form onReset={handleReset} onSubmit={handleSubmit}>
              {/* Description */}
              <Form.Field style={{ marginBottom: "3rem" }}>
                <CharacterFieldHeader>Description</CharacterFieldHeader>
                <Field
                  name="description"
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      spellCheck={false}
                      style={{
                        width: "50rem",
                        height: "15rem"
                      }}
                    />
                  )}
                />
              </Form.Field>

              {/* Tags */}
              <Form.Field style={{ marginBottom: "3rem" }}>
                <CharacterFieldHeader>Tags</CharacterFieldHeader>
                {characterTagTypes.map(tag => (
                  <Form.Field key={tag}>
                    <Field
                      name={`tags.${tag}`}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          label={tagTypeToTag[tag]}
                          onChange={(_, { checked }) =>
                            setFieldValue(`tags.${tag}`, checked)
                          }
                        />
                      )}
                    />
                  </Form.Field>
                ))}
              </Form.Field>

              {/* Combos */}
              <Form.Field style={{ marginBottom: "3rem" }}>
                <CharacterFieldHeader>Combos</CharacterFieldHeader>
                {values.combos.map((combo, index) => (
                  <Form.Field key={index}>
                    <Segment>
                      <Field
                        name={`combos[${index}]`}
                        render={({
                          field: {
                            value: {
                              input,
                              damage,
                              tags,
                              percentages,
                              demonstration,
                              notes
                            }
                          }
                        }) => (
                          <React.Fragment>
                            {/* Combo Input */}
                            <Form.Field>
                              <ComboFieldHeader>Input</ComboFieldHeader>
                              <TextArea
                                value={input}
                                onChange={(_, { value: input }) =>
                                  setFieldValue(`combos[${index}].input`, input)
                                }
                              />
                            </Form.Field>

                            {/* Combo Damage */}
                            <Form.Field>
                              <ComboFieldHeader>Damage Dealt</ComboFieldHeader>
                              <Input
                                value={damage}
                                onChange={(_, { value }) =>
                                  setFieldValue(
                                    `combos[${index}].damage`,
                                    value
                                  )
                                }
                              />
                            </Form.Field>

                            {/* Combo Tags */}
                            <Form.Field>
                              <ComboFieldHeader>Tags</ComboFieldHeader>
                              {comboTagTypes.map(tag => (
                                <Form.Field key={tag}>
                                  <Checkbox
                                    checked={tags[tag]}
                                    label={tagTypeToTag[tag]}
                                    onChange={(_, { checked }) =>
                                      setFieldValue(
                                        `combos[${index}].tags.${tag}`,
                                        checked
                                      )
                                    }
                                  />
                                </Form.Field>
                              ))}
                            </Form.Field>

                            {/* Combo Percentages */}
                            <Form.Field>
                              <ComboFieldHeader>Percentages</ComboFieldHeader>
                              <Segment basic style={styles.fancyPanel}>
                                {weightClassLabelsAndValues.map(
                                  ({ label, value }) => (
                                    <Form.Field key={value}>
                                      <Header as="h5" style={styles.fancyText}>
                                        {label}
                                      </Header>
                                      <Input
                                        value={percentages[value]}
                                        onChange={(
                                          _,
                                          { value: changedValue }
                                        ) =>
                                          setFieldValue(
                                            `combos[${index}].percentages.${value}`,
                                            changedValue
                                          )
                                        }
                                      />
                                    </Form.Field>
                                  )
                                )}
                              </Segment>
                            </Form.Field>

                            {/* Combo Demonstration */}
                            <Form.Field>
                              <Header as="h4" style={styles.fancyText}>
                                Demonstration
                              </Header>
                              <Input
                                value={demonstration}
                                onChange={(_, { value }) =>
                                  setFieldValue(
                                    `combos[${index}].demonstration`,
                                    value
                                  )
                                }
                              />
                            </Form.Field>

                            {/* Combo Notes */}
                            <Form.Field>
                              <Header as="h4" style={styles.fancyText}>
                                Notes
                              </Header>
                              <TextArea
                                value={notes}
                                onChange={(_, { value }) =>
                                  setFieldValue(`combos[${index}].notes`, value)
                                }
                              />
                            </Form.Field>
                          </React.Fragment>
                        )}
                      />
                    </Segment>
                  </Form.Field>
                ))}
                <Button primary icon type="button" size="huge">
                  <Icon name="plus" /> Add a combo
                </Button>
              </Form.Field>

              {/* Controls */}
              <Button.Group>
                <Button type="reset">Reset</Button>
                <Button primary>Send</Button>
              </Button.Group>
            </Form>
          </Segment>
        )}
      />
    </Layout>
  );
}

export const editCharacterPageQuery = graphql`
  query EditCharacterPageQuery($id: String!) {
    charactersJson(id: { eq: $id }) {
      name
      render {
        childImageSharp {
          fluid(maxWidth: 1075, quality: 72) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      description
      tags
      attributes {
        airAcceleration {
          maxAdditional
          baseValue
          total
          rank
        }
        airSpeed {
          maxAirSpeed
          rank
        }
        fallSpeed {
          maxFallSpeed
          fastFallSpeed
          speedIncrease
          rank
        }
        runSpeed {
          maxRunSpeed
          rank
        }
        walkSpeed {
          maxWalkSpeed
          rank
        }
        weight {
          class
          rank
          value
        }
      }
      combos {
        input
        percentages {
          balloonweight
          featherweight
          lightweight
          middleweight
          heavyweight
          superheavyweight
        }
        damage
        demonstration
        tags
        notes
      }
    }
  }
`;
