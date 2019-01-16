import React from "react";
import { Menu, Icon } from "semantic-ui-react";

import { SOCIAL_MEDIA } from "../config";
import * as styles from "../styles";

export default function SocialMediaItems() {
  return SOCIAL_MEDIA.map(({ site, url, color, tagline }) => (
    <Menu.Item
      key={site}
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...styles.fancyText,
        borderLeft: `2px solid ${color}`
      }}
    >
      <div>
        <Icon name={site} /> {tagline}
      </div>
    </Menu.Item>
  ));
}
