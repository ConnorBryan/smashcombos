import React from "react";

import { auth, UserService } from "../../services";

export default function Dashboard({ user }) {
  console.log("\n\n\n", "auth.currentUser()", auth.currentUser(), "\n\n\n");

  return (
    <div>
      <button onClick={UserService.updateUsername}>Derp</button>
    </div>
  );
}
