import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.308 7.398V5.697a3.611 3.611 0 00-7.22-.016v1.717M9.698 11.16v1.759"
        stroke="#F4F4F4"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.543 16.622c2.363-.519 3.22-1.915 3.22-4.718 0-3.723-1.513-4.965-6.065-4.965-4.544 0-6.064 1.242-6.064 4.965 0 3.724 1.52 4.965 6.064 4.965"
        stroke="#F4F4F4"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
