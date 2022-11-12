import { Box, Drawer, Theme, Toolbar, useMediaQuery } from '@mui/material';
import React, { FC, PropsWithChildren, useState } from 'react';
import { Footer } from '../sections';
import { NavBar, SideMenu } from '../UI';

let drawerWidth = 260;
interface Props extends PropsWithChildren {}

export const MainLayout: FC<Props> = ({ children }) => {
  const isNotSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [open, setOpen] = useState(isNotSm);

  const handleDrawerToggle = () => {
    setOpen(!open);
    drawerWidth = open ? 0 : 280;
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
      </Box>
    </>
  );
};
