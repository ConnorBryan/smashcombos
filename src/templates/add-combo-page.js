import React from "react";

import { ComboCreatorV2, Layout } from "../modules";

export default function AddComboPage({ navigate }) {
  return (
    <Layout navigate={navigate}>
      <ComboCreatorV2 />
    </Layout>
  );
}
