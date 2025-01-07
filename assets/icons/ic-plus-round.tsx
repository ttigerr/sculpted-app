import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#FFFFFFFF'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20.333 4v32.667M36.666 20.333H4"
        stroke="#fff"
        strokeWidth={6.66664}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
