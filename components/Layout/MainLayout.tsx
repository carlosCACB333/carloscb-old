import { Alert, AlertTitle, Box, Button, Drawer, Link, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useState } from 'react';
import { Footer } from '../sections';
import { NavBar, SideMenu } from '../UI';

let drawerWidth = 260;
interface Props extends PropsWithChildren {}

export const MainLayout: FC<Props> = ({ children }) => {
  const isNotSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [open, setOpen] = useState(isNotSm);
  const { asPath, isPreview } = useRouter();

  const handleDrawerToggle = () => {
    drawerWidth = open ? 0 : 260;
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant={isNotSm ? 'permanent' : 'temporary'}
            open={open}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': { width: drawerWidth, border: 'none' },
            }}
          >
            <SideMenu />
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
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
