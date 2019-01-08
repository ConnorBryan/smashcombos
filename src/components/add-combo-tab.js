import React from "react";

import { CharacterService } from "../services";
import ComboInterface from "./combo-interface";

export default function AddComboTab({
  character: { name, slug },
  showMessage
}) {
  return (
    <ComboInterface
      onContinue={async (combo, toggleConfirming) => {
        const success = await CharacterService.addCombo(slug, combo);

        showMessage(
          success
            ? {
                header: `Successfully added a combo for ${name}.`,
                content: "The change will be reviewed as soon as possible."
              }
            : {
                header: `Unable to add a combo for ${name}.`,
                content: `Please try again later.`
              }
        );

        toggleConfirming();
      }}
    />
  );
}
