import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import { Container } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

import Navbar from "./navbar";

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
        <React.Fragment>
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
            <meta property="og:title" content={data.site.siteMetadata.title} />
            <meta property="og:url" content="/" />
            <meta property="og:image" content="/img/og-image.png" />
          </Helmet>
          <React.Fragment>
            <Navbar />
            <Container
              style={{
                margin: "7rem 0"
              }}
            >
              {children}
            </Container>
          </React.Fragment>
        </React.Fragment>
      )}
    />
  );
}
