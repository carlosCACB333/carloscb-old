import { Alert, AlertTitle, Box, Button, Drawer, Link, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Footer } from '../sections';
import { NavBar, SideMenu } from '../UI';

interface Props extends PropsWithChildren {}

export const MainLayout: FC<Props> = ({ children }) => {
  const isLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const drawerWidth = useRef(0);
  const [open, setOpen] = useState(false);
  const { asPath, isPreview, pathname } = useRouter();

  useEffect(() => {
    setOpen(isLarge);
    drawerWidth.current = isLarge ? 270 : 0;
  }, [isLarge]);

  const handleDrawerToggle = () => {
    setOpen(!open);
    drawerWidth.current = open ? 0 : 270;
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth.current} />
        <Box component="nav" sx={{ width: { sm: drawerWidth.current }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant={isLarge ? 'permanent' : 'temporary'}
            open={open}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': { width: drawerWidth.current, border: 'none' },
            }}
          >
            <SideMenu />
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth.current}px)` } }}>
          {pathname !== '/blog/[slug]' && <Toolbar />}
          {children}
          <Footer />
        </Box>

        {isPreview && (
          <Alert
            severity="warning"
            variant="filled"
            sx={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              zIndex: 100,
              marginBottom: 2,
            }}
          >
            <AlertTitle>Modo de previsualización</AlertTitle>
            Solo puedes ver esto porque estás en modo de previsualización.{' '}
            <Link href={`/api/prev/exit?url=${asPath}`}>
              <Button size="small" variant="text" aria-label="exit preview">
                Desabilitar
              </Button>
            </Link>
          </Alert>
        )}
      </Box>
    </>
  );
};
