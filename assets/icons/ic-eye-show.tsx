import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({
  width = 24,
  height = 24,
  strokeColor = '#fff',
}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20.8c6.406 0 11.6-3.94 11.6-8.8 0-4.86-5.194-8.8-11.6-8.8C5.593 3.2.4 7.14.4 12c0 4.86 5.193 8.8 11.6 8.8zm0-4.4a4.4 4.4 0 100-8.8 4.4 4.4 0 000 8.8z"
        fill={strokeColor}
        fillOpacity={0.2}
      />
      <Path
        d="M14.8 12a2.8 2.8 0 11-5.6 0 2.8 2.8 0 015.6 0z"
        fill={strokeColor}
        fillOpacity={0.2}
      />
    </Svg>
  );
}

export default SvgComponent;
