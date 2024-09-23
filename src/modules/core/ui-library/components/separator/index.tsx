import {View, ViewProps} from 'react-native';
import React from 'react';

type SeparatorProps = ViewProps & {
  width?: number;
  height?: number;
};

const Separator: React.FC<SeparatorProps> = ({
  width = 0,
  height = 0,
  ...rest
}) => {
  return <View style={[{width, height}, rest.style]} />;
};

export default Separator;
