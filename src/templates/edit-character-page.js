import React from "react";
import { graphql } from "gatsby";
import { Formik, Field } from "formik";
import {
  Form,
  TextArea,
  Header,
  Button,
  Checkbox,
  Input,
  Segment
} from "semantic-ui-react";

import { Layout } from "../components";
import { getCharacter, getCharacterRender, tagTypeToTag } from "../helpers";
import * as styles from "../styles";

export default function EditCharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { description, tags, combos } = character;

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
        render={({ handleSubmit, handleReset, handleChange, values }) => (
          <Form onReset={handleReset} onSubmit={handleSubmit}>
            {/* Description */}
            <Form.Field style={{ marginBottom: "3rem" }}>
              <Header as="h3" style={styles.fancyText}>
                Description
              </Header>
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
              <Header as="h3" style={styles.fancyText}>
                Tags
              </Header>
              <Form.Field>
                <Field
                  name="tags.fastFaller"
                  render={({ field, form }) => (
                    <Checkbox
                      checked={field.value}
                      label="Fast Faller"
                      onChange={(_, { checked }) =>
                        form.setFieldValue("tags.fastFaller", checked)
                      }
                    />
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="tags.floatie"
                  render={({ field, form }) => (
                    <Checkbox
                      checked={field.value}
                      label="Floatie"
                      onChange={(_, { checked }) =>
                        form.setFieldValue("tags.floatie", checked)
                      }
                    />
                  )}
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="tags.bigBody"
                  render={({ field, form }) => (
                    <Checkbox
                      checked={field.value}
                      label="Big Body"
                      onChange={(_, { checked }) =>
                        form.setFieldValue("tags.bigBody", checked)
                      }
                    />
                  )}
                />
              </Form.Field>
            </Form.Field>

            {/* Combos */}
            <Form.Field style={{ marginBottom: "3rem" }}>
              <Header as="h3" style={styles.fancyText}>
                Combos
              </Header>
              {values.combos.map((combo, index) => (
                <Form.Field key={index}>
                  <Segment>
                    <Field
                      name={`combos[${index}]`}
                      render={({
                        field: {
                          value,
                          value: {
                            input,
                            damage,
                            tags,
                            percentages,
                            demonstration,
                            notes
                          }
                        },
                        form: { setFieldValue }
                      }) => (
                        <React.Fragment>
                          <Form.Field>
                            <Header as="h4" style={styles.fancyText}>
                              Input
                            </Header>
                            <TextArea
                              value={input}
                              onChange={(_, { value: input }) =>
                                setFieldValue(`combos[${index}].input`, input)
                              }
                            />
                          </Form.Field>
                          <Form.Field>
                            <Header as="h4" style={styles.fancyText}>
                              Damage Dealt
                            </Header>
                            <Input
                              value={damage}
                              onChange={(_, { value }) =>
                                setFieldValue(`combos[${index}].damage`, value)
                              }
                            />
                          </Form.Field>
                          <Form.Field>
                            <Header as="h4" style={styles.fancyText}>
                              Tags
                            </Header>
                            <Form.Field>
                              <Checkbox
                                checked={tags.diable}
                                label="DI-able"
                                onChange={(_, { checked }) =>
                                  setFieldValue(
                                    `combos[${index}].tags.diable`,
                                    checked
                                  )
                                }
                              />
                            </Form.Field>
                            <Form.Field>
                              <Checkbox
                                checked={tags.killConfirm}
                                label="Kill Confirm"
                                onChange={(_, { checked }) =>
                                  setFieldValue(
                                    `combos[${index}].tags.killConfirm`,
                                    checked
                                  )
                                }
                              />
                            </Form.Field>
                            <Form.Field>
                              <Checkbox
                                checked={tags.fastFaller}
                                label="Fast Faller"
                                onChange={(_, { checked }) =>
                                  setFieldValue(
                                    `combos[${index}].tags.fastFaller`,
                                    checked
                                  )
                                }
                              />
                            </Form.Field>
                            <Form.Field>
                              <Checkbox
                                checked={tags.floatie}
                                label="Floatie"
                                onChange={(_, { checked }) =>
                                  setFieldValue(
                                    `combos[${index}].tags.floatie`,
                                    checked
                                  )
                                }
                              />
                            </Form.Field>
                            <Form.Field>
                              <Checkbox
                                checked={tags.floatie}
                                label="Big Body"
                                onChange={(_, { checked }) =>
                                  setFieldValue(
                                    `combos[${index}].tags.bigBody`,
                                    checked
                                  )
                                }
                              />
                            </Form.Field>
                          </Form.Field>
                          <Form.Field>
                            <Header as="h4" style={styles.fancyText}>
                              Percentages
                            </Header>
                            <Segment
                              basic
                              style={{
                                paddingLeft: "1rem",
                                borderLeft: "1px solid #738BD6"
                              }}
                            >
                              <Form.Field>
                                <Header as="h5" style={styles.fancyText}>
                                  Balloonweight
                                </Header>
                                <Input
                                  value={percentages.balloonweight}
                                  onChange={(_, { value }) =>
                                    setFieldValue(
                                      `combos[${index}].percentages.balloonweight`,
                                      value
                                    )
                                  }
                                />
                              </Form.Field>
                              <Form.Field>
                                <Header as="h5" style={styles.fancyText}>
                                  Featherweight
                                </Header>
                                <Input
                                  value={percentages.featherweight}
                                  onChange={(_, { value }) =>
                                    setFieldValue(
                                      `combos[${index}].percentages.featherweight`,
                                      value
                                    )
                                  }
                                />
                              </Form.Field>
                              <Form.Field>
                                <Header as="h5" style={styles.fancyText}>
                                  Lightweight
                                </Header>
                                <Input
                                  value={percentages.lightweight}
                                  onChange={(_, { value }) =>
                                    setFieldValue(
                                      `combos[${index}].percentages.lightweight`,
                                      value
                                    )
                                  }
                                />
                              </Form.Field>
                              <Form.Field>
                                <Header as="h5" style={styles.fancyText}>
                                  Middleweight
                                </Header>
                                <Input
                                  value={percentages.middleweight}
                                  onChange={(_, { value }) =>
                                    setFieldValue(
                                      `combos[${index}].percentages.middleweight`,
                                      value
                                    )
                                  }
                                />
                              </Form.Field>
                              <Form.Field>
                                <Header as="h5" style={styles.fancyText}>
                                  Heavyweight
                                </Header>
                                <Input
                                  value={percentages.heavyweight}
                                  onChange={(_, { value }) =>
                                    setFieldValue(
                                      `combos[${index}].percentages.heavyweight`,
                                      value
                                    )
                                  }
                                />
                              </Form.Field>
                              <Form.Field>
                                <Header as="h5" style={styles.fancyText}>
                                  Super Heavyweight
                                </Header>
                                <Input
                                  value={percentages.superheavyweight}
                                  onChange={(_, { value }) =>
                                    setFieldValue(
                                      `combos[${index}].percentages.superheavyweight`,
                                      value
                                    )
                                  }
                                />
                              </Form.Field>
                            </Segment>
                          </Form.Field>
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
            </Form.Field>

            {/* Controls */}
            <Button.Group>
              <Button type="reset">Reset</Button>
              <Button primary>Send</Button>
            </Button.Group>
          </Form>
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
      killConfirms {
        input
        percentages {
          balloonweight
          featherweight
          lightweight
          middleweight
          heavyweight
          superheavyweight
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
        killConfirm
        diable
        demonstration
        tags
        notes
      }
    }
  }
`;
