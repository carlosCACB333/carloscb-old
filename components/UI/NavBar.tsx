import { AppBar, Box, IconButton, Toolbar, Button } from '@mui/material';
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
  const { t } = useTranslation('common');

  const onChangeLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    Cookies.set('NEXT_LOCALE', newLocale, { path: '/' });
    replace(asPath, undefined, { locale: newLocale, scroll: false });
  };

  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: 800,
        backdropFilter: 'blur(5px)',
      }}
    >
      <Toolbar>
        <IconButton onClick={handleDrawerToggle} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link href="/project">
          <Button
            size="small"
            variant={asPath === '/project' ? 'contained' : 'text'}
            color="primary"
            aria-label="projects"
          >
            {t('nav.projects')}
          </Button>
        </Link>
        <Link href="/certification">
          <Button
            size="small"
            variant={asPath === '/certification' ? 'contained' : 'text'}
            color="primary"
            aria-label="certifications"
          >
            {t('nav.certifications')}
          </Button>
        </Link>

        <Box flex={1}></Box>
        <IconButton onClick={toggleMode} color="primary" aria-label="toggle light/dark mode">
          <WbSunnyIcon />
        </IconButton>

        <Button
          variant={locale === 'en' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={onChangeLanguage}
          startIcon={<TranslateOutlined />}
          sx={{ minWidth: 0, padding: '4px 0 4px 10px' }}
          aria-label="change language"
        />
      </Toolbar>
    </AppBar>
  );
};
