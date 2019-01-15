import React from "react";
import { Formik, Field } from "formik";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Segment
} from "semantic-ui-react";

import { Layout } from "../components";
import { UserContext } from "../components/user-provider";
import smashball from "../img/smashball-dark.png";
import * as styles from "../styles";

export default function SignIn({ navigate }) {
  return (
    <Layout fluid>
      <UserContext.Consumer>
        {({ signin }) => (
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={async ({ email, password }) => {
              const response = await signin(email, password);

              if (!response) {
                return console.log("Failed...", response);
              }

              navigate("/");
            }}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid
                  style={{
                    minHeight: "100vh"
                  }}
                >
                  <Grid.Column
                    only="tablet computer"
                    width={8}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#738BD6"
                    }}
                  >
                    <Image fluid src={smashball} alt="Super Smash Bros" />
                  </Grid.Column>
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#222",
                      borderTop: "1px solid #738BD6",
                      borderRight: "1px solid #738BD6",
                      borderBottom: "1px solid #738BD6"
                    }}
                  >
                    <Segment basic padded="very">
                      <Header
                        as="h2"
                        style={styles.fancyText}
                        content="Sign in"
                      />
                      <p
                        style={{
                          ...styles.fancyPanel,
                          marginBottom: "2rem",
                          fontSize: "1.2rem"
                        }}
                      >
                        Contribute to the largest compendium of combos in the
                        Smash Bros community. Heroes get remembered, legends
                        never die.
                      </p>
                      <Segment attached compact padded="very">
                        <Field
                          name="email"
                          render={({ field }) => (
                            <Form.Input
                              {...field}
                              fluid
                              label="Email"
                              placeholder="Enter your email..."
                              icon="envelope"
                              iconPosition="left"
                              required
                            />
                          )}
                        />
                        <Field
                          name="password"
                          render={({ field }) => (
                            <Form.Input
                              {...field}
                              fluid
                              type="password"
                              label="Password"
                              placeholder="Enter your password..."
                              icon="lock"
                              iconPosition="left"
                              required
                            />
                          )}
                        />
                      </Segment>
                      <Segment compact attached style={{ padding: 0 }}>
                        <Button.Group widths={2}>
                          <Button
                            icon
                            type="button"
                            onClick={() => navigate("/sign-up")}
                          >
                            <span style={{ marginRight: "4px" }}>
                              <Icon name="user plus" />
                            </span>
                            Sign up
                          </Button>
                          <Button icon primary type="submit">
                            <Icon name="sign in" /> Sign in
                          </Button>
                        </Button.Group>
                      </Segment>
                      <span
                        style={{
                          display: "block",
                          marginTop: "1rem",
                          textAlign: "center"
                        }}
                      >
                        <Button basic>Forgot password?</Button>
                      </span>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column
                    only="mobile"
                    width={16}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "420px",
                      background: "#738BD6"
                    }}
                  >
                    <Image fluid src={smashball} alt="Super Smash Bros" />
                  </Grid.Column>
                </Grid>
              </Form>
            )}
          />
        )}
      </UserContext.Consumer>
    </Layout>
  );
}
