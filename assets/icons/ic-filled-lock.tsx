import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#F4F4F4'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 120 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={27}
        y={49.9998}
        width={69}
        height={53}
        rx={9}
        fill="#D9D9D9"
        fillOpacity={0.2}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.859 9.926c14.478 0 26.27 11.79 26.27 26.284l-.001 7.817C96.93 47.09 103.26 55.47 103.26 65.304V86.57c0 12.421-10.1 22.521-22.52 22.521H42.854c-12.42 0-22.52-10.1-22.52-22.52V65.303c0-9.832 6.329-18.21 15.128-21.275l.004-7.82c.03-7.14 2.791-13.729 7.774-18.668 4.988-4.943 11.573-7.804 18.619-7.615zM80.74 50.22H42.854c-8.32 0-15.083 6.763-15.083 15.083V86.57c0 8.32 6.763 15.084 15.083 15.084h37.887c8.315 0 15.083-6.763 15.083-15.084V65.304c0-8.32-6.768-15.083-15.083-15.083zM61.796 66.71a3.72 3.72 0 013.72 3.72v11.011a3.72 3.72 0 01-3.72 3.72 3.72 3.72 0 01-3.718-3.72V70.43a3.72 3.72 0 013.718-3.719zm.048-49.348h-.08c-5.022 0-9.728 1.934-13.283 5.46-3.58 3.54-5.558 8.265-5.578 13.302l-.004 6.656h37.787l.005-6.571c0-10.393-8.454-18.847-18.847-18.847z"
        fill={strokeColor}
      />
    </Svg>
  );
}

export default SvgComponent;
