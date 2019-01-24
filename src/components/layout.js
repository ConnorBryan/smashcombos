import React, { Component } from "react";
import { Container, Menu, Message, Icon, Sidebar } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

import * as styles from "../styles";
import Head from "./head";
import Navbar from "./navbar";
import SiteActions from "./site-actions";
import SocialMediaItems from "./social-media-items";
import UserProvider, { UserContext } from "./user-provider";
import MenuProvider, { MenuContext } from "./menu-provider";
import MessageProvider, { MessageContext } from "./message-provider";
import "./layout.less";

export default class Layout extends Component {
  componentDidCatch() {
    const { navigate } = this.props;

    navigate("/", {
      state: {
        message:
          "An unknown error has occurred. If this happens again, please email admin@smashcombos.com"
      }
    });
  }

  render() {
    const { fluid, style = {}, children } = this.props;

    return (
      <MessageProvider>
        <UserProvider>
          <MenuProvider>
            <Head />
            <>
              <MessageContext.Consumer>
                {({ message, clearMessage }) => (
                  <>
                    <MenuContext.Consumer>
                      {({ isOpen, toggle, close }) => (
                        <UserContext.Consumer>
                          {({ user, signout }) => (
                            <>
                              <Navbar
                                user={user}
                                signout={signout}
                                toggleMenu={toggle}
                              />
                              <Container
                                fluid={fluid}
                                className="layout"
                                style={{
                                  marginTop: "68px",
                                  marginBottom: "68px",
                                  paddingTop: "28px",
                                  ...style
                                }}
                              >
                                <Sidebar.Pushable className="mobile-only">
                                  <Sidebar
                                    as={Menu}
                                    animation="overlay"
                                    vertical
                                    visible={isOpen}
                                    width="wide"
                                    fluid
                                    style={{
                                      background: "#111"
                                    }}
                                  >
                                    <Menu.Item
                                      onClick={close}
                                      style={styles.fancyText}
                                    >
                                      <Icon name="close" /> Close Menu
                                    </Menu.Item>
                                    <SiteActions
                                      user={user}
                                      closeMenu={close}
                                    />
                                    <SocialMediaItems />
                                  </Sidebar>
                                  <Sidebar.Pusher>{children}</Sidebar.Pusher>
                                </Sidebar.Pushable>
                                <div className="desktop-only">{children}</div>
                              </Container>
                            </>
                          )}
                        </UserContext.Consumer>
                      )}
                    </MenuContext.Consumer>
                    {message && (
                      <Message
                        size="large"
                        style={{
                          position: "fixed",
                          bottom: 0,
                          zIndex: 3,
                          width: "100%",
                          background: "none",
                          border: "none",
                          boxShadow: "none"
                        }}
                      >
                        <Container
                          style={{
                            padding: "0 1rem"
                          }}
                        >
                          <Message
                            size="large"
                            header={message.header}
                            content={message.content}
                            onDismiss={clearMessage}
                            style={{
                              border: "1px solid #eee"
                            }}
                          />
                        </Container>
                      </Message>
                    )}
                  </>
                )}
              </MessageContext.Consumer>
            </>
          </MenuProvider>
        </UserProvider>
      </MessageProvider>
    );
  }
}
