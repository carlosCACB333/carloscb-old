import { Container, Typography } from '@mui/material';
import { ContainerProps } from '@mui/system';
import React, { FC } from 'react';

interface Props extends ContainerProps {
  title?: string;
  detail?: string;
  component?: React.ElementType;
}
export const SectionLayout: FC<Props> = ({ children, title, detail, sx, ...props }) => {
  return (
    <Container sx={{ paddingY: '4rem', ...sx }} {...props}>
      {title && (
        <Typography textAlign="center" variant="h1" data-aos="fade-up">
          {title}
        </Typography>
      )}

      {detail && (
        <Typography textAlign="center" variant="body1" sx={{ mb: 4 }} data-aos="fade-up">
          {detail}
        </Typography>
      )}
      {children}
    </Container>
  );
};
