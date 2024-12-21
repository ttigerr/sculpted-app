import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2.708 10.292h.772l5.295-5.295-.772-.772L2.708 9.52v.772zm-1.083 1.083V9.073l7.15-7.137c.108-.099.228-.176.36-.23a1.123 1.123 0 01.833 0 .945.945 0 01.35.244l.745.758c.109.1.188.217.238.352a1.16 1.16 0 010 .82c-.05.131-.129.25-.238.359l-7.136 7.136H1.625zm6.757-6.757l-.379-.393.772.772-.393-.38z"
        fill="#F4F4F4"
      />
    </Svg>
  )
}

export default SvgComponent
