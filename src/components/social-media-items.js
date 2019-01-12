import React from "react";
import { Menu, Icon } from "semantic-ui-react";

import { SOCIAL_MEDIA } from "../config";
import * as styles from "../styles";

export default function SocialMediaItems() {
  return SOCIAL_MEDIA.map(({ site, url, tagline }) => (
    <Menu.Item key={site} as="a" href={url} style={styles.fancyText}>
      <Icon name={site} /> {tagline}
    </Menu.Item>
  ));
}
