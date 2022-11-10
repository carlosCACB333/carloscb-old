import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import { useCallback } from 'react';

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
type ImageFit = 'clip' | 'crop' | 'scale' | 'max';
const RATIOS = {
  '1:1': 1,
  '16:9': 9 / 16,
  '4:3': 3 / 4,
  '3:2': 2 / 3,
  '9:12': 12 / 9,
};

type Props = {
  fit?: ImageFit;
  ratio: keyof typeof RATIOS;
  alt: string;
} & DistributiveOmit<ImageProps, 'height'>;

export const HygraphImg = ({ fit = 'clip', ratio, alt, ...props }: Props) => {
  const imageLoader = useCallback(
    ({ src, width }: ImageLoaderProps) => {
      const h = getHeight(width, ratio);
      const url_array = src.split('/');
      url_array[2] += `/resize=${fit ? 'fit:' + fit + ',' : ''}height:${h},width:${width}`;
      return url_array.join('/');
    },
    [ratio, fit]
  );

  return <Image fill alt={alt} {...props} loader={imageLoader} />;
};

const getHeight = (width: number, AspectRatio: keyof typeof RATIOS) => {
  const ratio = RATIOS[AspectRatio];
  return Math.floor(width / ratio);
};
