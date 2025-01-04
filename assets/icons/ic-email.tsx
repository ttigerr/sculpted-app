import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width = 52, height = 44, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 52 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={2.16667}
        y={2.16667}
        width={47.6667}
        height={39}
        rx={13}
        stroke="#fff"
        strokeWidth={4.33333}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.886 18.44a1 1 0 01-.088 1.412L13.56 28.897a1 1 0 01-1.411-.087l-1.545-1.75a1 1 0 01.087-1.41l10.238-9.045a1 1 0 011.412.087l1.545 1.748zm6.941-1.748a1 1 0 011.412-.087l10.238 9.044a1 1 0 01.087 1.412l-1.545 1.748a1 1 0 01-1.411.088L29.37 19.852a1 1 0 01-.088-1.412l1.545-1.748z"
        fill="#707070"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.838 10.83a1 1 0 011.386-.28l12.807 8.485a1 1 0 001.105 0l12.807-8.486a1 1 0 011.385.282l1.29 1.945a1 1 0 01-.282 1.386l-13.36 8.851a4.333 4.333 0 01-4.786 0l-13.36-8.851a1 1 0 01-.28-1.386l1.288-1.945z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
