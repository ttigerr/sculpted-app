import * as React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.34 4.521a2.85 2.85 0 00-3.68 0L6.073 13.467a3.45 3.45 0 00-1.223 2.635V30a3.45 3.45 0 003.45 3.45h3.75V25.5A1.95 1.95 0 0114 23.55h8.7a1.95 1.95 0 011.95 1.95v7.95h4.05A3.45 3.45 0 0032.15 30V16.102a3.45 3.45 0 00-1.223-2.635L20.339 4.52zM14.917 2.46a5.55 5.55 0 017.164 0l10.587 8.945a6.15 6.15 0 012.18 4.698V30a6.15 6.15 0 01-6.15 6.15h-4.8a1.95 1.95 0 01-1.95-1.95v-7.95h-7.2v7.95a1.95 1.95 0 01-1.95 1.95H8.3A6.15 6.15 0 012.15 30V16.102c0-1.81.799-3.53 2.182-4.698L14.918 2.46z"
        fill="#fff"
        fillOpacity={0.4}
      />
    </Svg>
  )
}

export default SvgComponent;
