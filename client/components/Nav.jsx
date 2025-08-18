import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import blackLogoImage from "../public/connXblack.png";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  // Validate token on load
  useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth && auth.token) {
      try {
        const payload = JSON.parse(atob(auth.token.split(".")[1]));
        if (payload.exp > Date.now() / 1000) setState(auth);
        else window.localStorage.removeItem("auth");
      } catch {
        window.localStorage.removeItem("auth");
      }
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ background: "black", boxShadow: "0 2px 10px rgba(255,255,255,0.1)" }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link href="/">
              <Image src={blackLogoImage} alt="Connx Logo" width={120} height={30} />
            </Link>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button component={Link} href="/" sx={{ color: "white", fontWeight: 500 }}>Home</Button>
            <Button component={Link} href="/contribution" sx={{ color: "white", fontWeight: 500 }}>Become Contributor</Button>
            <Button component={Link} href="/about" sx={{ color: "white", fontWeight: 500 }}>About</Button>
            <Button component={Link} href="/community" sx={{ color: "white", fontWeight: 500 }}>Community</Button>
            {state ? (
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  background: "white",
                  color: "black",
                  borderRadius: "30px",
                  px: 3,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { background: "#e5e5e5" },
                }}
              >
                {state.user?.username}
              </Button>
            ) : (
              <Button
                component={Link}
                href="/register"
                sx={{
                  background: "white",
                  color: "black",
                  borderRadius: "30px",
                  px: 3,
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { background: "#e5e5e5" },
                }}
              >
                Login / Register
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <IconButton
            edge="end"
            onClick={() => setOpenDrawer(true)}
            sx={{ display: { xs: "block", md: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 240 }}>
          <ListItem button component={Link} href="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} href="/contribution">
            <ListItemText primary="Become Contributor" />
          </ListItem>
          <ListItem button component={Link} href="/about">
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} href="/community">
            <ListItemText primary="Community" />
          </ListItem>
          {state ? (
            <>
              <ListItem button component={Link} href="/dashboard">
                <DashboardIcon fontSize="small" sx={{ mr: 1 }} /> Dashboard
              </ListItem>
              <ListItem button onClick={logout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
              </ListItem>
            </>
          ) : (
            <ListItem button component={Link} href="/register">
              <ListItemText primary="Login / Register" />
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Profile Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem component={Link} href="/dashboard" onClick={() => setAnchorEl(null)}>
          <DashboardIcon fontSize="small" sx={{ mr: 1 }} /> Dashboard
        </MenuItem>
        <MenuItem component={Link} href="/user/profile/update" onClick={() => setAnchorEl(null)}>
          <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} /> My Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
