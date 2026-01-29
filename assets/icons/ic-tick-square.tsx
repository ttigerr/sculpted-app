import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#F4F4F4'}: IconProps) {
  return (
    <Svg
      width={20}
      height={22}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        clipRule="evenodd"
        d="M13.611 2.92H6.387c-2.517 0-4.095 1.81-4.095 4.371v6.912c0 2.56 1.57 4.37 4.095 4.37h7.224c2.526 0 4.097-1.81 4.097-4.37V7.29c0-2.561-1.571-4.371-4.096-4.371z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.333 1.438v2.539M6.667 1.438v2.539"
        stroke={strokeColor}
        strokeOpacity={0.38}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M6 9h8M6 14h8"
        stroke={strokeColor}
        strokeOpacity={0.38}
        strokeLinecap="round"
      />
      <Path d="M6 9h5M6 14h2" stroke="#FDDF38" strokeLinecap="round" />
    </Svg>
  );
}

export default SvgComponent;
