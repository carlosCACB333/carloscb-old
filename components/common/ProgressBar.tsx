import { Box, CircularProgress, SxProps } from '@mui/material';
interface Props {
  sx?: SxProps;
}
export const ProgressBar = ({ sx }: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', ...sx }}>
      <CircularProgress color="primary" aria-label="loading" />
    </Box>
  );
};
