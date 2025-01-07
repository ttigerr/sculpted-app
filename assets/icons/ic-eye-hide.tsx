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
        d="M7.795 20.438c1.304.385 2.722.596 4.205.596 6.407 0 11.6-3.94 11.6-8.8 0-1.981-.863-3.81-2.32-5.28l-4.896 4.896a4.4 4.4 0 01-4.768 4.768l-3.82 3.82z"
        fill={strokeColor}
        fillOpacity={0.2}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.75 2.517l.566.566a.4.4 0 010 .565L4.214 21.75a.4.4 0 01-.565 0l-.566-.565a.4.4 0 010-.566l1.573-1.573C2.058 17.432.4 14.98.4 12.234c0-4.86 5.194-8.8 11.6-8.8 2.482 0 4.782.592 6.669 1.599l2.516-2.516a.4.4 0 01.566 0zM9.2 12.234a2.8 2.8 0 014.496-2.228l1.138-1.138a4.4 4.4 0 00-6.2 6.2l1.138-1.138a2.788 2.788 0 01-.572-1.696z"
        fill={strokeColor}
        fillOpacity={0.2}
      />
    </Svg>
  );
}

export default SvgComponent;
