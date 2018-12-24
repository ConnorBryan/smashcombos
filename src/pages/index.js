import React, { Component } from "react";
import { graphql, Link } from "gatsby";

const getCharacters = data =>
  data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ fields: { slug } }) => slug.includes("characters"))
    .map(({ frontmatter }) => frontmatter);

export default class IndexPage extends Component {
  render() {
    const { data } = this.props;
    const characters = getCharacters(data);

    return <p>Index</p>;
  }
}

export const pageQuery = graphql`
  query IndexPageQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            render {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            attributes {
              weight {
                class
              }
            }
            killConfirms {
              balloonweightPercentage
              featherweightPercentage
              heavyweightPercentage
              input
              lightweightPercentage
              middleweightPercentage
              superHeavyweightPercentage
            }
            combos {
              balloonweightPercentage
              featherweightPercentage
              heavyweightPercentage
              input
              lightweightPercentage
              middleweightPercentage
              superHeavyweightPercentage
            }
          }
        }
      }
    }
  }
`;
