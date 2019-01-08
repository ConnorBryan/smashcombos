import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import { Container, Menu, Message, Sidebar } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

import * as styles from "../styles";
import Navbar from "./navbar";
import SiteActions from "./site-actions";
import UserProvider, { UserContext } from "./user-provider";
import MenuProvider, { MenuContext } from "./menu-provider";
import MessageProvider, { MessageContext } from "./message-provider";
import "./layout.less";

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query HeadQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <MessageProvider>
          <UserProvider>
            <MenuProvider>
              <Helmet>
                <html lang="en" />
                <title>
                  {data.site.siteMetadata.title} |{" "}
                  {data.site.siteMetadata.description}
                </title>
                <meta
                  name="description"
                  content={data.site.siteMetadata.description}
                />
                <link
                  rel="shortcut icon"
                  href="/img/favicon.ico"
                  type="image/x-icon"
                />
                <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
                <link
                  rel="apple-touch-icon"
                  sizes="57x57"
                  href="/img/apple-touch-icon-57x57.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="72x72"
                  href="/img/apple-touch-icon-72x72.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="76x76"
                  href="/img/apple-touch-icon-76x76.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="/img/apple-touch-icon-114x114.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="120x120"
                  href="/img/apple-touch-icon-120x120.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="/img/apple-touch-icon-144x144.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="152x152"
                  href="/img/apple-touch-icon-152x152.png"
                />
                <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="/img/apple-touch-icon-180x180.png"
                />
                <meta name="theme-color" content="#111" />
                <meta property="og:type" content="business.business" />
                <meta
                  property="og:title"
                  content={data.site.siteMetadata.title}
                />
                <meta property="og:url" content="/" />
                <meta property="og:image" content="/img/og-image.png" />
              </Helmet>
              <React.Fragment>
                <MessageContext.Consumer>
                  {({ message, clearMessage }) => (
                    <React.Fragment>
                      <MenuContext.Consumer>
                        {({ isOpen, toggle, close }) => (
                          <UserContext.Consumer>
                            {({ user }) => (
                              <React.Fragment>
                                <Navbar user={user} toggleMenu={toggle} />
                                <Container
                                  className="layout"
                                  style={{
                                    marginTop: "7rem"
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
                                      <SiteActions
                                        user={user}
                                        closeMenu={close}
                                      />
                                      <Menu.Item
                                        style={styles.fancyText}
                                        onClick={close}
                                      >
                                        Close
                                      </Menu.Item>
                                    </Sidebar>
                                    <Sidebar.Pusher>{children}</Sidebar.Pusher>
                                  </Sidebar.Pushable>
                                  <div className="desktop-only">{children}</div>
                                </Container>
                              </React.Fragment>
                            )}
                          </UserContext.Consumer>
                        )}
                      </MenuContext.Consumer>
                      {message && (
                        <Message
                          size="big"
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
                          <Container>
                            <Message
                              size="big"
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
                    </React.Fragment>
                  )}
                </MessageContext.Consumer>
              </React.Fragment>
            </MenuProvider>
          </UserProvider>
        </MessageProvider>
      )}
    />
  );
}
