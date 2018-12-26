import React from "react";

import { Layout, Master } from "../components";
import "./index.scss";

export default function IndexPage() {
  return (
    <Layout className="IndexPage" basic={true}>
      <div className="IndexPage-content">
        <Master />
      </div>
    </Layout>
  );
}
