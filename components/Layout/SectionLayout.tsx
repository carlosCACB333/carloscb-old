import { Box, Container, SxProps, Typography } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  bg?: string;
  sx?: SxProps;
  id?: string;
  title?: string;
  detail?: string;
  widh?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
export const SectionLayout: FC<Props> = ({ children, bg, sx, id, title, detail, widh = 'lg' }) => {
  return (
    <Box bgcolor={bg ?? 'transparent'} sx={{ marginBottom: '4rem', ...sx }} id={id}>
      <Container>
        {title && (
          <Typography textAlign="center" variant="h1">
            {title}
          </Typography>
        )}

        {detail && (
          <Typography textAlign="center" variant="body1" sx={{ mb: 4 }}>
            {detail}
          </Typography>
        )}
      </Container>

      {widh ? <Container maxWidth={widh}>{children}</Container> : <Box>children</Box>}
    </Box>
  );
};
