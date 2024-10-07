import * as React from 'react';
import Svg, {G, Rect, Path, Defs, ClipPath} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#F4F4F4'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 120 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clipPath="url(#clip0_756_2409)">
        <Rect
          x={29}
          y={49}
          width={69}
          height={53}
          rx={9}
          fill="#D9D9D9"
          fillOpacity={0.2}
        />
        <Path
          d="M62.579 84.525a3.631 3.631 0 01-3.63-3.63v-10.75a3.631 3.631 0 013.63-3.63 3.631 3.631 0 013.63 3.63v10.75a3.631 3.631 0 01-3.63 3.63z"
          fill={strokeColor}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.089 42.444v-5.718c.208-10.053 8.218-18.03 18.246-18.15h.228c8.082 0 15.313 5.348 17.636 13.082a3.64 3.64 0 004.526 2.435 3.632 3.632 0 002.43-4.525c-3.238-10.789-13.32-18.252-24.592-18.252h-.32c-13.963.17-25.124 11.267-25.415 25.332v8.203c-10.597 4.852-14.952 14.273-14.952 29.84 0 24.776 11.03 33.986 40.704 33.986s40.705-9.21 40.705-33.986c0-24.776-11.03-33.982-40.704-33.982-7.236 0-13.363.548-18.492 1.735zM41.29 50.68c.281-.067.55-.165.803-.293 4.986-1.727 11.671-2.419 20.486-2.419 25.943 0 33.445 5.992 33.445 26.722 0 20.734-7.502 26.726-33.445 26.726-25.942 0-33.444-5.992-33.444-26.726 0-13.301 3.088-20.534 12.155-24.01z"
          fill={strokeColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_756_2409">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H119V119H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
