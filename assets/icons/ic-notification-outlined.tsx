import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';


function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.883 13.404c.345.385.788.596 1.248.596h.001c.462 0 .907-.211 1.253-.597a.5.5 0 01.744.67C9.59 14.67 8.88 15 8.132 15h-.001c-.748 0-1.455-.33-1.992-.928a.5.5 0 11.744-.668zM8.165.667c2.963 0 4.954 2.308 4.954 4.463 0 1.109.282 1.579.581 2.077.296.492.631 1.051.631 2.107-.232 2.698-3.049 2.918-6.166 2.918-3.118 0-5.935-.22-6.165-2.875-.002-1.099.333-1.658.63-2.15l.104-.175c.257-.443.477-.924.477-1.902C3.21 2.975 5.2.667 8.165.667zm0 1c-2.33 0-3.954 1.825-3.954 3.463 0 1.386-.385 2.027-.725 2.592-.273.454-.488.813-.488 1.592.111 1.257.941 1.918 5.167 1.918 4.202 0 5.058-.69 5.168-1.961-.002-.736-.217-1.095-.49-1.549-.34-.565-.724-1.206-.724-2.592 0-1.638-1.624-3.463-3.954-3.463z"
        fill="#F4F4F4"
      />
    </Svg>
  )
}

export default SvgComponent
