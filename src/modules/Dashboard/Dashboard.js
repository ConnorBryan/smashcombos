import React from "react";

import { UserService } from "../../services";

export default function Dashboard({ user }) {
  return (
    <div>
      <button onClick={UserService.updateUsername}>Derp</button>
    </div>
  );
}
