import * as React from "react"
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
        d="M30.522 27.474c0 5.153-7.066 5.748-12.38 5.748h-.38C14.377 33.214 5.76 33 5.76 27.443c0-5.047 6.782-5.722 12.055-5.747h.708c3.385.007 11.999.221 11.999 5.778zM18.142 2.16c4.578 0 8.3 3.724 8.3 8.3 0 4.578-3.722 8.3-8.3 8.3h-.05c-4.567-.014-8.268-3.74-8.252-8.304 0-4.572 3.724-8.296 8.302-8.296z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent