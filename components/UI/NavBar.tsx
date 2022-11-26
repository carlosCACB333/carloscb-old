import { TranslateOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ThemeContext } from '../../context';
import { Link } from '../common';

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
      <Toolbar sx={{ gap: 1 }}>
        <IconButton onClick={handleDrawerToggle} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link variant="button" color={asPath === '/project' ? 'primary.main' : 'text.primary'} href="/project">
          {t('nav.projects')}
        </Link>
        <Link
          variant="button"
          color={asPath === '/certification' ? 'primary.main' : 'text.primary'}
          href="/certification"
        >
          {t('nav.certifications')}
        </Link>
        <Link variant="button" color={asPath === '/blog' ? 'primary.main' : 'text.primary'} href="/blog">
          {t('nav.blog')}
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
