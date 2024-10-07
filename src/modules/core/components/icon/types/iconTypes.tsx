interface IconProps {
  name?: string;
  size?:
    | 'xsmall'
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge';
  disabled?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeColor?: string;
  fill?: string;
}

export default IconProps;
