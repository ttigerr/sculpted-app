import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5.979.41L2.77 4.64.875 2.744 0 3.619l2.916 2.916L7 1.285 5.979.41z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
