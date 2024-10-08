import * as React from "react"
import Svg, { Path } from "react-native-svg"
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.93 20.874c0 4.147-5.688 4.626-9.964 4.626H9.66C6.935 25.493 0 25.32 0 20.849c0-4.063 5.458-4.605 9.702-4.626h.57c2.724.006 9.657.178 9.657 4.65zM9.965 18.11c-5.361 0-8.079.92-8.079 2.739 0 1.834 2.718 2.764 8.079 2.764 5.36 0 8.076-.921 8.076-2.74 0-1.834-2.716-2.763-8.076-2.763zm0-17.61a6.687 6.687 0 016.68 6.68 6.686 6.686 0 01-6.68 6.68h-.04a6.668 6.668 0 01-6.642-6.683C3.284 3.497 6.28.5 9.966.5zm0 1.797A4.89 4.89 0 005.08 7.18a4.873 4.873 0 004.85 4.884l.036.898v-.898a4.89 4.89 0 004.883-4.884 4.889 4.889 0 00-4.883-4.884z"
        fill="#bcbdbe"
      />
    </Svg>
  )
}

export default SvgComponent