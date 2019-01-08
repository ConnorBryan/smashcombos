import React, { Component } from "react";

export const MessageContext = React.createContext();

export default class MessageProvider extends Component {
  state = {
    message: null,
    showMessage: (message, time = 5000) => {
      this.setState({ message });
      setTimeout(this.state.clearMessage, time);
    },
    clearMessage: () =>
      this.setState({
        message: null
      })
  };

  showingMessage = null;

  render() {
    return (
      <MessageContext.Provider value={this.state}>
        {this.props.children}
      </MessageContext.Provider>
    );
  }
}
