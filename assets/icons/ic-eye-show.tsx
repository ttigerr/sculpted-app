import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#fff'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G opacity={0.4} fill="#fff" clipPath="url(#clip0_756_2144)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.952 17.356c-5.929-.087-9.358-4.335-9.882-5.032a.157.157 0 010-.193C2.592 11.425 6.039 7.09 12 7c5.975-.089 9.424 4.415 9.934 5.131a.156.156 0 01-.002.19c-.522.704-4.035 5.121-9.98 5.034zm0-1.355c2.098 0 3.798-1.69 3.798-3.775 0-2.084-1.7-3.774-3.798-3.774s-3.798 1.69-3.798 3.774c0 2.085 1.7 3.775 3.798 3.775z"
        />
        <Path d="M14.211 12.226c0 1.23-.99 2.226-2.211 2.226a2.219 2.219 0 01-2.212-2.226c0-1.23.99-2.226 2.212-2.226 1.221 0 2.211.997 2.211 2.226z" />
      </G>
      <Defs>
        <ClipPath id="clip0_756_2144">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
