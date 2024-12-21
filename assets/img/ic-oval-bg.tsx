import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function OvalBg({width = 104, height = 16}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 104 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M102 8c0 4-22.386 6-50 6S2 12 2 8s22.386-6 50-6 50 2 50 6z"
        stroke="url(#paint0_linear_970_987)"
        strokeWidth={4}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_970_987"
          x1={2}
          y1={8}
          x2={102}
          y2={8}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3BD0D6" />
          <Stop offset={1} stopColor="#428EC5" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default OvalBg;
