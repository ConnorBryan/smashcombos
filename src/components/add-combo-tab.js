import React from "react";

import { CharacterService } from "../services";
import ComboInterface from "./combo-interface";

export default function AddComboTab({ character: { name, slug } }, navigate) {
  return (
    <ComboInterface
      onContinue={async combo => {
        const success = await CharacterService.addCombo(slug, combo);

        navigate(slug, {
          state: {
            message: success
              ? `Successfully added a combo for ${name}.`
              : `Unable to add a combo for ${name}. Please try again later.`
          }
        });
      }}
    />
  );
}
