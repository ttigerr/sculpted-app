import * as React from "react"
import { RFValue } from "react-native-responsive-fontsize";
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.522 27.474c0 5.153-7.066 5.748-12.38 5.748h-.38C14.377 33.214 5.76 33 5.76 27.443c0-5.047 6.782-5.722 12.055-5.747h.707c3.386.007 12 .221 12 5.778zm-12.38-3.434c-6.66 0-10.037 1.144-10.037 3.403 0 2.28 3.376 3.434 10.037 3.434 6.66 0 10.035-1.144 10.035-3.403 0-2.279-3.375-3.434-10.035-3.434zm0-21.88c4.578 0 8.3 3.724 8.3 8.3 0 4.578-3.723 8.3-8.3 8.3h-.05c-4.568-.014-8.268-3.74-8.252-8.304 0-4.572 3.723-8.296 8.302-8.296zm0 2.232a6.076 6.076 0 00-6.07 6.069 6.054 6.054 0 006.025 6.068l.045 1.116V16.53a6.075 6.075 0 006.067-6.068 6.074 6.074 0 00-6.067-6.069z"
        fill="#fff"
        opacity={0.4}
      />
    </Svg>
  )
}

export default SvgComponent