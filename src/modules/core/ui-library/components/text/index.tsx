import React from 'react';
import {customText, TextProps} from 'react-native-paper';

const Text = customText<
  'h1' & 'h2' & 'h3' & 'body' & 'paragraph' & 'caption' & 'delete'
>();

export default Text;
