import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={1}
        y={1}
        width={22}
        height={18}
        rx={6}
        stroke="#F4F4F4"
        strokeWidth={2}
      />
      <Path
        d="M6 6l5.717 3.788a1 1 0 001.105 0L18.538 6"
        stroke="#F4F4F4"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M6 12.23l3.918-3.46M18.539 12.23L14.62 8.77"
        stroke="#1E1E1E"
        strokeOpacity={0.44}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
