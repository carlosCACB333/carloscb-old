import { AppBar, Box, IconButton, Toolbar, Typography, Button } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TranslateOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';

interface Props {
  handleDrawerToggle: () => void;
  drawerWidth: number;
}
export const NavBar = ({ handleDrawerToggle, drawerWidth }: Props) => {
  const { toggleMode } = useContext(ThemeContext);
  const { locale, asPath, replace } = useRouter();
  const { t } = useTranslation('navbar');

  const onChangeLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    Cookies.set('NEXT_LOCALE', newLocale, { path: '/' });
    replace(asPath, asPath, { locale: newLocale, scroll: false });
  };

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: 800,
      }}
    >
      <Toolbar>
        <IconButton onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Link href="/project">
          <Button variant="text">{t('projects')}</Button>
        </Link>
        <Link href="/blog">
          <Button variant="text">{t('blog')}</Button>
        </Link>
        <Box flex={1}></Box>
        <IconButton onClick={toggleMode} sx={{ color: 'text.primary' }}>
          <WbSunnyIcon />
        </IconButton>

        <Button
          variant="outlined"
          size="small"
          onClick={onChangeLanguage}
          startIcon={<TranslateOutlined />}
          sx={{ ml: 1 }}
        >
          {locale === 'en' ? 'Es' : 'En'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
