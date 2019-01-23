import React from "react";
import { Formik, Field } from "formik";
import { Button, Form } from "semantic-ui-react";

import { getUsername, getEmail } from "../helpers";
import SectionHeader from "./SectionHeader";

export default function AccountInformation({ user }) {
  return (
    <Formik
      initialValues={{
        username: getUsername(user),
        email: getEmail(user)
      }}
      onSubmit={console.info}
      render={({ handleSubmit, isSubmitting }) => (
        <>
          <SectionHeader
            header="Account Information"
            description="Change information related to your user account, including name, email, and more."
          />
          <Form
            onSubmit={handleSubmit}
            style={{
              padding: "2rem",
              background: "#1B1C1C"
            }}
          >
            <Field
              name="username"
              render={({ field }) => (
                <Form.Input
                  {...field}
                  label="Username"
                  placeholder="Change your username..."
                  icon="user"
                  iconPosition="left"
                  required
                />
              )}
            />
            <Field
              name="email"
              render={({ field }) => (
                <Form.Input
                  {...field}
                  label="Email"
                  placeholder="Change your email..."
                  icon="envelope"
                  iconPosition="left"
                  required
                />
              )}
            />
            <Button.Group widths={2}>
              <Button content="Reset" onClick={() => {}} />
              <Button primary content="Update" onClick={() => {}} />
            </Button.Group>
          </Form>
        </>
      )}
    />
  );
}
