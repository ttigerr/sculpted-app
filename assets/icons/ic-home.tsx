import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#A3A3A3'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.226 7.249a1.9 1.9 0 00-2.452 0l-7.058 5.963A2.3 2.3 0 008.9 14.97v9.265a2.3 2.3 0 002.3 2.3h2.5v-5.3a1.3 1.3 0 011.3-1.3h5.8a1.3 1.3 0 011.3 1.3v5.3h2.7a2.3 2.3 0 002.3-2.3V14.97a2.3 2.3 0 00-.816-1.757L19.226 7.25zm-3.614-1.375a3.7 3.7 0 014.776 0l7.058 5.963A4.1 4.1 0 0128.9 14.97v9.265a4.1 4.1 0 01-4.1 4.1h-3.2a1.3 1.3 0 01-1.3-1.3v-5.3h-4.8v5.3a1.3 1.3 0 01-1.3 1.3h-3a4.1 4.1 0 01-4.1-4.1V14.97a4.1 4.1 0 011.454-3.132l7.058-5.963z"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  );
}

export default SvgComponent;
