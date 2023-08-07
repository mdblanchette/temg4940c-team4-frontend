import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import { Link } from "@mui/material";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  color: active ? "#6466f1" : "#9da4ae",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      background: "#1c2536",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      background: "#1c2536",
    },
  }),
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const currentURL = router.asPath;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            COVALENCE
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List sx={{ color: "#9da4ae" }}>
          <ListItemButton
            component={StyledLink}
            to="/"
            onClick={handleDrawerClose}
            sx={{
              "&:hover": {
                backgroundColor: "#252e3e",
              },
              color: currentURL === "/" ? "#ffffff" : "inherit",
            }}
          >
            <StyledListItemIcon active={currentURL === "/"}>
              <AutoAwesomeMosaicIcon />
            </StyledListItemIcon>
            <ListItemText
              primary="Overview"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItemButton>
          <ListItemButton
            component={StyledLink}
            to="/watchlist"
            onClick={handleDrawerClose}
            sx={{
              "&:hover": {
                backgroundColor: "#252e3e",
              },
              color: currentURL === "/watchlist" ? "#ffffff" : "inherit",
            }}
          >
            <StyledListItemIcon active={currentURL === "/watchlist"}>
              <DataSaverOffIcon />
            </StyledListItemIcon>
            <ListItemText
              primary="Watchlist"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItemButton>
          <ListItemButton
            component={StyledLink}
            to="/bondscreener"
            onClick={handleDrawerClose}
            sx={{
              "&:hover": {
                backgroundColor: "#252e3e",
              },
              color: currentURL === "/bondscreener" ? "#ffffff" : "inherit",
            }}
          >
            <StyledListItemIcon active={currentURL === "/bondscreener"}>
              <TroubleshootIcon />
            </StyledListItemIcon>
            <ListItemText
              primary="Bond Screener"
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
