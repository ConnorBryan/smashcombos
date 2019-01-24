import React from "react";

import { Attributes, Profile } from "../../components";
import { getCharacter, getCharacterRender } from "../../helpers";
import { ComboList } from "./components";

export default function Character({ data, query }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, slug, description, attributes, combos, tags } = character;
  const {
    weight: { class: weightClass }
  } = attributes;

  return (
    <>
      <Profile
        slug={slug}
        image={image}
        name={name}
        description={description}
        weightClass={weightClass}
        tags={tags}
        attributes={attributes}
      />
      <ComboList slug={slug} combos={combos} query={query} />
      <div className="mobile-only">
        <Attributes attributes={attributes} />
      </div>
    </>
  );
}
