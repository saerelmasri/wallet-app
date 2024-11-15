import * as Progress from "react-native-progress";
import React from "react";

type ProgressCircleType = {
  progress: number;
  size: number;
  thickness: number;
  icon: string;
  extraStyle?: string;
};

const ProgressCircle = ({
  progress,
  size,
  thickness,
  icon,
  extraStyle,
}: ProgressCircleType) => {
  return (
    <Progress.Circle
      className={`${extraStyle}`}
      progress={progress}
      size={size}
      color="#04EE7E"
      unfilledColor="#EFEFEF"
      thickness={thickness}
      showsText
      formatText={() => icon}
      textStyle={{
        fontSize: 10,
      }}
      strokeCap="round"
      animated
      borderColor="transparent"
    />
  );
};

export default ProgressCircle;
