import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#ffffff'}: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 34 46" fill="none">
      <Path
        d="M10.725 16.642v10.04M17.555 11.836v14.847M24.274 21.947v4.736"
        stroke={strokeColor}
        strokeWidth={3.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M2 18.5c0-11.25 3.75-15 15-15s15 3.75 15 15-3.75 15-15 15-15-3.75-15-15z"
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
