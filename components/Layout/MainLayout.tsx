import { Box, Drawer, Theme, Toolbar, useMediaQuery } from '@mui/material';
import React, { FC, PropsWithChildren, useState } from 'react';
import { Footer } from '../sections';
import { NavBar, SideMenu } from '../UI';

const drawerWidth = 280;
interface Props extends PropsWithChildren {}

export const MainLayout: FC<Props> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isNotSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavBar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant={isNotSm ? 'permanent' : 'temporary'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
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
      </Box>
    </>
  );
};
