import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SpiralBg({width = 129, height = 10}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 129 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2 2c6.682 0 8.404 6 14.544 6 5.373 0 9.564-6 14.937-6 4.912 0 8.06 6 12.972 6 5.526 0 8.231-6 13.758-6 5.373 0 8.778 6 14.15 6 5.68 0 8.472-6 14.152-6 5.833 0 9.496 6 15.33 6 5.219 0 7.752-6 12.971-6 4.913 0 7.274 6 12.186 6"
        stroke="url(#paint0_linear_970_986)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_970_986"
          x1={2}
          y1={5}
          x2={127}
          y2={5}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDDF38" />
          <Stop offset={1} stopColor="#EE7933" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SpiralBg;
