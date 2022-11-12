import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AuthorContext } from '../../context';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { author } = useContext(AuthorContext);
  const { t } = useTranslation('common');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: '1rem',
      }}
    >
      <Typography>
        {t('footer.made')} <span style={{ color: 'red' }}>❤</span> {t('footer.by')}{' '}
        {author.firstName + ' ' + author.lastName}
      </Typography>

      <Typography>
        © {new Date().getFullYear()} - {t('footer.rights')}{' '}
      </Typography>
    </Box>
  );
};
