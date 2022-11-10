import { Skeleton } from '@mui/material';
import React from 'react';

export const Loader = ({ count = 8 }) => {
  return (
    <div>
      <Skeleton variant="rectangular" height={20 * count} />
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
};
