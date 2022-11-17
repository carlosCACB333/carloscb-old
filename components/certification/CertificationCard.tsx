import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Certification } from '../../graphql/generated/graphql';
import { HygraphImg } from '../UI';

interface Props {
  certification: Certification;
}
export const CertificationCard: FC<Props> = ({ certification }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <HygraphImg
        src={certification.picture?.url}
        alt={certification.name}
        fit="clip"
        aspRatio={5 / 4}
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, (max-width: 1500px) 25vw, 22vw"
      />
    </Box>
  );
};
