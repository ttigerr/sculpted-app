import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import IconProps from 'src/modules/core/components/icon/types/iconTypes';

function SvgComponent({width, height, strokeColor = '#F4F4F4'}: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 102 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.62 46.317A4.683 4.683 0 0033.935 51a4.683 4.683 0 004.683 4.684A4.683 4.683 0 0043.303 51a4.68 4.68 0 00-4.673-4.683h-.01zM27.56 51c0-6.108 4.951-11.058 11.06-11.058h.012C44.737 39.948 49.678 44.9 49.678 51c0 6.108-4.95 11.059-11.059 11.059-6.108 0-11.058-4.95-11.058-11.059z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.316 51a3.188 3.188 0 013.187-3.187h26.852a3.188 3.188 0 013.187 3.188v7.87a3.188 3.188 0 01-6.375 0v-4.683H46.503A3.188 3.188 0 0143.316 51z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.336 47.813a3.188 3.188 0 013.188 3.188v7.87a3.188 3.188 0 01-6.375 0v-7.87a3.188 3.188 0 013.187-3.188z"
        fill={strokeColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.604 22.542c-5.197 5.198-7.666 13.894-7.666 28.459 0 14.564 2.469 23.26 7.666 28.458 5.198 5.197 13.894 7.666 28.459 7.666 14.564 0 23.26-2.469 28.457-7.666C85.719 74.26 88.189 65.564 88.189 51c0-14.564-2.47-23.26-7.668-28.458-5.197-5.197-13.893-7.667-28.457-7.667-14.565 0-23.261 2.47-28.459 7.667zm-4.508-4.508C26.184 10.947 37.145 8.5 52.063 8.5c14.918 0 25.878 2.446 32.966 9.535 7.089 7.087 9.534 18.048 9.534 32.966 0 14.917-2.445 25.877-9.534 32.965-7.088 7.089-18.048 9.535-32.966 9.535-14.917 0-25.877-2.446-32.965-9.535-7.089-7.088-9.535-18.047-9.535-32.965 0-14.918 2.447-25.878 9.534-32.966z"
        fill={strokeColor}
      />
    </Svg>
  );
}

export default SvgComponent;
