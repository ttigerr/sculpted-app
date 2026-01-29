import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M1.667 5.378c0-2.234 1.84-4.045 4.11-4.045h4.109c2.27 0 4.11 1.811 4.11 4.045v.578c0 .319-.264.577-.588.577a.582.582 0 01-.587-.577v-.578c0-1.596-1.314-2.89-2.935-2.89h-4.11c-1.62 0-2.935 1.294-2.935 2.89v9.244c0 1.596 1.314 2.89 2.935 2.89h4.11c1.621 0 2.935-1.294 2.935-2.89v-.433c0-.32.263-.578.587-.578.325 0 .587.259.587.578v.433c0 2.234-1.84 4.045-4.11 4.045H5.777c-2.27 0-4.11-1.811-4.11-4.045V5.378z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.58 9.796a.286.286 0 010 .408l-2.788 2.745a.297.297 0 01-.415 0l-.415-.409a.286.286 0 010-.408l1.579-1.554H7.684a.291.291 0 01-.293-.29v-.577c0-.16.131-.289.293-.289h8.857l-1.58-1.554a.286.286 0 010-.408l.416-.409a.297.297 0 01.415 0l2.789 2.745z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
