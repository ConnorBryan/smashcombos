import React from "react";
import platform from "platform";

import { Layout } from "../components";

export default function DownloadApp() {
  return <Layout>{platform.os.family}</Layout>;
}
