import React from "react";
import { Button, Icon, Menu } from "semantic-ui-react";

export default function SocialMediaButtons() {
  return (
    <>
      <Menu.Item
        style={{
          padding: 0
        }}
      >
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.gg/EMVEzhS"
          secondary
          size="large"
          icon
          fluid
        >
          <Icon name="discord" /> Join the Discord
        </Button>
      </Menu.Item>
      <Menu.Item
        style={{
          padding: 0
        }}
      >
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/SmashCombosCom"
          secondary
          size="large"
          icon
          fluid
        >
          <Icon name="twitter" /> Follow us on Twitter
        </Button>
      </Menu.Item>
      <Menu.Item
        style={{
          padding: 0
        }}
      >
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/smashcombos/"
          secondary
          size="large"
          icon
          fluid
        >
          <Icon name="facebook" /> Like us on Facebook
        </Button>
      </Menu.Item>
      <Menu.Item
        style={{
          padding: 0
        }}
      >
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.reddit.com/r/smashcombos/"
          secondary
          size="large"
          icon
          fluid
        >
          <Icon name="reddit" /> Check us out on Reddit
        </Button>
      </Menu.Item>
      <Menu.Item
        style={{
          padding: 0
        }}
      >
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/ConnorBryan/smashcombos"
          secondary
          size="large"
          icon
          fluid
        >
          <Icon name="github" /> See the code on GitHub
        </Button>
      </Menu.Item>
    </>
  );
}
