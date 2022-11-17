import { Box, CircularProgress, SxProps } from '@mui/material';
import React from 'react';
interface Props {
  sx?: SxProps;
}
export const ProgressBar = ({ sx }: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', ...sx }}>
      <CircularProgress color="primary" />
    </Box>
  );
};
