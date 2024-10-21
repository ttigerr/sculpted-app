import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#fff'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.943 16.299c0 3.317-4.55 3.701-7.97 3.701h-.245C5.548 19.994 0 19.857 0 16.279c0-3.25 4.367-3.684 7.762-3.7h.455c2.18.004 7.726.142 7.726 3.72zm-7.97-2.211c-4.29 0-6.463.737-6.463 2.19 0 1.468 2.174 2.212 6.463 2.212 4.287 0 6.46-.737 6.46-2.191 0-1.467-2.173-2.211-6.46-2.211zM7.973 0a5.35 5.35 0 015.343 5.345 5.349 5.349 0 01-5.343 5.343H7.94a5.334 5.334 0 01-5.313-5.346A5.35 5.35 0 017.973 0zm0 1.437a3.912 3.912 0 00-3.909 3.908 3.898 3.898 0 003.88 3.907l.029.719v-.719a3.912 3.912 0 003.906-3.907 3.911 3.911 0 00-3.906-3.908z"
        fill={strokeColor}
      />
    </Svg>
  );
}

export default SvgComponent;
