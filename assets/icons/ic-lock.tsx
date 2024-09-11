import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.231 6.714c2.358 0 4.269 1.87 4.269 4.175v4.936c0 2.306-1.911 4.175-4.269 4.175H4.77C2.41 20 .5 18.13.5 15.825V10.89c0-2.306 1.911-4.175 4.269-4.175h8.462zm-4.236 4.67a.875.875 0 00-.884.865v2.206c0 .487.396.874.884.874a.88.88 0 00.894-.874v-2.206a.878.878 0 00-.894-.865z"
        fill="#F4F4F4"
      />
      <Path
        opacity={0.4}
        d="M14.523 5.396v1.47c-.356-.099-.732-.148-1.118-.148h-.66V5.396c0-2.017-1.677-3.657-3.74-3.657s-3.74 1.63-3.75 3.637v1.342h-.65c-.396 0-.772.05-1.128.159V5.396C3.487 2.415 5.957 0 8.985 0c3.069 0 5.538 2.415 5.538 5.396z"
        fill="#F4F4F4"
      />
    </Svg>
  );
}

export default SvgComponent;
