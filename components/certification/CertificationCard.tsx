import { Box } from '@mui/material';
import { FC } from 'react';
import { Certification } from '../../graphql/generated/graphql';
import { HygraphImg } from '../UI';

interface Props {
  certification: Certification;
  idx: number;
}
export const CertificationCard: FC<Props> = ({ certification, idx }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        ':hover': {
          boxShadow: 3,
        },
      }}
    >
      <HygraphImg
        src={certification.picture?.url}
        alt={certification.name}
        fit="scale"
        aspRatio={5 / 4}
        sizes="(max-width: 600px) 80vw, (max-width: 900px) 40vw,(max-width: 1200px) 30vw, 20vw"
        priority={idx <= 8}
        loading={idx <= 8 ? 'eager' : 'lazy'}
        style={{
          borderRadius: '10px',
        }}
      />
    </Box>
  );
};
