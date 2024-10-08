import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.575a7.425 7.425 0 100 14.85 7.425 7.425 0 000-14.85zM.225 9a8.775 8.775 0 1117.55 0A8.775 8.775 0 01.225 9z"
        fill="#EE7933"
      />
      <Path
        d="M5.435 13.133a.426.426 0 01-.569-.568l2.419-5.078a.426.426 0 01.202-.202l5.078-2.418a.426.426 0 01.568.568l-2.418 5.079a.427.427 0 01-.202.201l-5.078 2.418z"
        fill="#EE7933"
      />
      <Path
        d="M4.874 5.385a.426.426 0 01.51-.511l2.457.562c.39.09.453.618.095.797l-.942.47a.426.426 0 00-.188.184l-.569 1.09a.426.426 0 01-.793-.103l-.57-2.49zM13.129 12.617a.426.426 0 01-.511.511l-2.456-.562a.426.426 0 01-.096-.797l.942-.47a.426.426 0 00.188-.184l.57-1.09a.426.426 0 01.793.103l.57 2.49z"
        fill="#EE7933"
        fillOpacity={0.5}
      />
    </Svg>
  )
}

export default SvgComponent