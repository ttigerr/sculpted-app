import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#F4F4F4'}: IconProps) {
  return (
    <Svg
      width={21}
      height={23}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7.895 18H5.368c-.893 0-1.75-.374-2.381-1.041A3.658 3.658 0 012 14.445v-8c0-.943.355-1.848.987-2.514a3.281 3.281 0 012.381-1.042h9.264c.893 0 1.75.375 2.381 1.042.632.666.987 1.57.987 2.514V9.11M2 7.334h16"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.667 2v2.538M7 2v2.538"
        stroke={strokeColor}
        strokeOpacity={0.38}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14.5 20a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        stroke="#FDDF38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.351 14L14 15.546"
        stroke={strokeColor}
        strokeOpacity={0.38}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
