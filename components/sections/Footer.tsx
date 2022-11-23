import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthorContext } from '../../context';

export const Footer = () => {
  const { t } = useTranslation('common');
  const { author, loading } = useContext(AuthorContext);
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
        {!loading && author && author.firstName + ' ' + author.lastName}
      </Typography>

      <Typography>
        © {new Date().getFullYear()} - {t('footer.rights')}{' '}
      </Typography>
    </Box>
  );
};
