import React, { Component } from "react";

import { auth, UserContext } from "./user-provider";

export class AbstractRedirect extends Component {
  componentDidMount() {
    const { navigate, redirect, message, redirectBack } = this.props;

    if (!auth.currentUser()) {
      setTimeout(
        () =>
          navigate(redirect, { state: { message, redirect: redirectBack } }),
        0
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { navigate, user, redirect, message, redirectBack } = this.props;

    if (!user && prevProps.user) {
      navigate(redirect, { state: { message, redirect: redirectBack } });
    }
  }

  render() {
    return this.props.children;
  }
}

export default function Redirect({
  navigate,
  children,
  redirect,
  redirectBack,
  message
}) {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <AbstractRedirect
          navigate={navigate}
          user={user}
          redirect={redirect}
          redirectBack={redirectBack}
          message={message}
        >
          {children}
        </AbstractRedirect>
      )}
    </UserContext.Consumer>
  );
}
