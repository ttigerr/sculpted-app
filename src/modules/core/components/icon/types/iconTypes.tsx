export type IconSize =
  | 'xsmall'
  | 'small'
  | 'normal'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';
interface IconProps {
  name?: string;
  size?: IconSize;
  disabled?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeColor?: string;
  fill?: string;
}

export default IconProps;
