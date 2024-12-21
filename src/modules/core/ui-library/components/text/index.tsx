import React from 'react';
import {customText, TextProps} from 'react-native-paper';

const Text = customText<
  'h1' & 'h2' & 'h3' & 'h4' & 'body' & 'body1' & 'body2' & 'paragraph' & 'caption' & 'delete' & 'greeting'
>();

export default Text;
