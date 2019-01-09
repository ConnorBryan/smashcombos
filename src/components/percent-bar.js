import React from "react";
import { Progress } from "semantic-ui-react";

import {
  getPercentageThreshhold,
  percentageThresholdToColor
} from "../helpers";

export default function PercentBar({ value, ...rest }) {
  const percentageThreshold = getPercentageThreshhold(value);
  const color = percentageThresholdToColor(percentageThreshold);

  return (
    <Progress {...rest} active size="large" percent={value} color={color} />
  );
}
