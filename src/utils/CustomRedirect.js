import React, { Component } from "react";

import { auth, UserContext } from "../providers";

export class AbstractRedirect extends Component {
  state = {
    initiallyLoaded: false
  };

  componentDidMount() {
    const { navigate, redirect, message, redirectBack } = this.props;

    if (!auth.currentUser()) {
      setTimeout(
        () =>
          navigate(redirect, { state: { message, redirect: redirectBack } }),
        0
      );
    } else {
      this.setState({ initiallyLoaded: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { navigate, user, redirect, message, redirectBack } = this.props;

    if (!user && prevProps.user) {
      navigate(redirect, { state: { message, redirect: redirectBack } });
    }
  }

  render() {
    const { children } = this.props;
    const { initiallyLoaded } = this.state;

    return initiallyLoaded ? children : null;
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
