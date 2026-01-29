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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.662 1.834a.344.344 0 01-.394.267 8 8 0 106.712 7.326.344.344 0 01.3-.37l.662-.075c.183-.021.349.11.363.294A9.333 9.333 0 1111.534.794c.181.03.298.206.261.387l-.133.653z"
        fill="#FF505A"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.113 17.81A9.29 9.29 0 0110 19.333a9.29 9.29 0 01-5.112-1.523 5.336 5.336 0 0110.225 0z"
        fill="#FF505A"
      />
      <Path
        d="M13 10a3 3 0 11-6 0 3 3 0 016 0zM13.902 5.73a.333.333 0 010-.47l3.772-3.772c.13-.13.34-.13.471 0l.471.472c.13.13.13.34 0 .471l-3.77 3.771a.333.333 0 01-.472 0l-.472-.471z"
        fill="#FF505A"
      />
      <Path
        d="M14.374 1.488c.13-.13.341-.13.471 0l3.771 3.771c.13.13.13.342 0 .472l-.47.471a.333.333 0 01-.472 0l-3.771-3.771a.333.333 0 010-.471l.47-.472z"
        fill="#FF505A"
      />
    </Svg>
  )
}

export default SvgComponent
