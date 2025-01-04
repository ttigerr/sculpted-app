import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#EE7933'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.824.5h2.448v4.848h4.824v2.448H7.272v4.848H4.824V7.796H0V5.348h4.824V.5z"
        fill={strokeColor}
      />
    </Svg>
  );
}

export default SvgComponent;
