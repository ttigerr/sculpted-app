import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#A3A3A3'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13 1L2 12l11 11"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
