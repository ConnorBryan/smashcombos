import React, { Component } from "react";

export const MenuContext = React.createContext();

export default class MenuProvider extends Component {
  state = {
    isOpen: false,
    open: () => this.setState({ isOpen: true }),
    close: () => this.setState({ isOpen: false }),
    toggle: () =>
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }))
  };

  render() {
    return (
      <MenuContext.Provider value={this.state}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}
