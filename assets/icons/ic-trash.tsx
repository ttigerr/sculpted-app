import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({
  width = 34,
  height = 41,
  strokeColor = '#fff',
}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 34 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.495 2.194c-1.01 0-1.828.818-1.828 1.828v3.29h10.969v-3.29c0-1.01-.819-1.828-1.828-1.828h-7.313zM24.83 7.312v-3.29C24.83 1.8 23.03 0 20.808 0h-7.313a4.022 4.022 0 00-4.021 4.022v3.29h-8.41a.731.731 0 00-.73.731v.732c0 .404.327.73.73.73h2.61l1.28 26.882a4.022 4.022 0 004.018 3.83h16.359a4.022 4.022 0 004.017-3.83l1.28-26.881h2.61a.731.731 0 00.732-.731v-.732a.731.731 0 00-.732-.73H24.83zm3.603 2.194H5.871l1.275 26.777c.046.974.85 1.74 1.826 1.74h16.359c.976 0 1.78-.766 1.826-1.74l1.275-26.777zM10.936 34.002a.731.731 0 01-.731-.731V14.259c0-.404.327-.731.731-.731h.731c.404 0 .732.327.732.73v19.013a.731.731 0 01-.732.731h-.731zm5.85 0a.731.731 0 01-.731-.731V14.259c0-.404.327-.731.73-.731h.732c.404 0 .731.327.731.73v19.013a.731.731 0 01-.731.731h-.731zm5.85 0a.731.731 0 01-.732-.731V14.259c0-.404.328-.731.732-.731h.73c.405 0 .732.327.732.73v19.013a.731.731 0 01-.731.731h-.731z"
        fill={strokeColor}
      />
    </Svg>
  );
}

export default SvgComponent;
