import React from "react";
import { Header } from "semantic-ui-react";

import downRightArrow from "../img/down-right-arrow.svg";

export default function Input({ input }) {
  if (!input) {
    return null;
  }

  const inputs = input.split(" ");

  if (input.length === 0) {
    return <Header as="h3">{inputs[0]}</Header>;
  }

  const [first, ...rest] = inputs;

  return (
    <div>
      <Header as="h2">{first}</Header>
      {rest.map((input, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <img
            src={downRightArrow}
            alt="Arrow"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              marginRight: "2rem",
              filter: "invert(100%)"
            }}
          />
          <Header
            as="h2"
            style={{
              margin: 0
            }}
          >
            {input}
          </Header>
        </div>
      ))}
    </div>
  );
}
