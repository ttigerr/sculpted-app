import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#fff'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.702 28.16v-4.587c0-1.17.956-2.12 2.136-2.12h4.31c.567 0 1.11.224 1.51.621.401.398.626.937.626 1.5v4.586a1.82 1.82 0 00.535 1.3c.345.346.815.54 1.305.54h2.942a5.19 5.19 0 003.665-1.499 5.114 5.114 0 001.519-3.634V11.8a3.709 3.709 0 00-1.343-2.853L17.9 1.014a4.646 4.646 0 00-5.923.106L2.201 8.947A3.711 3.711 0 00.75 11.8v13.053C.75 27.696 3.071 30 5.934 30h2.874a1.847 1.847 0 001.854-1.827l.04-.013z"
        fill={strokeColor}
      />
    </Svg>
  );
}

export default SvgComponent;
