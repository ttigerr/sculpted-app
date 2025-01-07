import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, fill}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.364 1.429L4.702 11.09.273 6.662 1.41 5.527l3.293 3.285L13.229.293l1.135 1.136z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
