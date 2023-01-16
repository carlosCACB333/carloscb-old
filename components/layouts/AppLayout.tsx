import { Box, Drawer, Theme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context";
import { NavBar } from "../common";
import { Footer } from "../sections";
import { SectionLayout } from "./SectionLayout";

interface Props extends PropsWithChildren {}

const width = 280;

export const AppLayout: FC<Props> = ({ children }) => {
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const { Sidebar, Rightbar } = useContext(LayoutContext);

  useEffect(() => {
    setOpen(isSM);
  }, [isSM]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={open && isLg ? width : 0}
      />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          maxWidth: "100vw",
          pr: 2,
          gridTemplateColumns: `${open && isSM ? width + "px" : 0} auto ${
            Rightbar && isLg ? "25rem" : 0
          }`,
          "& .MuiDrawer-root": {
            position: "sticky",
            top: 0,
            height: "100vh",
          },
        }}
      >
        <Box component="nav">
          <Drawer
            variant={isSM ? "persistent" : "temporary"}
            open={open}
            onClose={handleDrawerToggle}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              "& .MuiDrawer-paper": {
                border: "none",
                top: 0,
                position: "static",
                width,
                px: 2,
                pt: 8,
                pb: 2,
              },
            }}
          >
            {Sidebar}
          </Drawer>
        </Box>

        <Box
          id="main-content"
          component="main"
          sx={{
            pt: pathname !== "/blog/[slug]" ? "4em" : 0,
            maxWidth: "100%",
            minWidth: 0,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1 }}>
            {Rightbar && !isLg && (
              <SectionLayout component="aside">{Rightbar}</SectionLayout>
            )}

            {children}
          </Box>

          <Footer />
        </Box>
        {Rightbar && isLg && (
          <Box>
            <Box
              component="aside"
              sx={{
                position: "sticky",
                top: "6rem",
              }}
            >
              {Rightbar}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
