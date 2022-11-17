import { Box } from '@mui/material';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import { useCallback } from 'react';

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
type ImageFit = 'clip' | 'crop' | 'scale' | 'max';

type Props = {
  fit?: ImageFit;
  aspRatio: number;
  alt: string;
} & DistributiveOmit<ImageProps, 'height'>;

export const HygraphImg = ({ fit = 'clip', aspRatio, alt, ...props }: Props) => {
  const imageLoader = useCallback(
    ({ src, width }: ImageLoaderProps) => {
      const h = Math.floor(width / aspRatio);
      const url_array = src.split('/');
      url_array[2] += `/resize=${fit ? 'fit:' + fit + ',' : ''}height:${h},width:${width}`;
      return url_array.join('/');
    },
    [aspRatio, fit]
  );

  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      <Image fill alt={alt} {...props} loader={imageLoader} />
    </Box>
  );
};
