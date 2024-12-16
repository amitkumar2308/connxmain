import React, { useContext, useState, useEffect } from "react";
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
  Container,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import blackLogoImage from "../public/connXblack.png";
import { UserContext } from "../context"; // Import your user context
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Nav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, setState] = useContext(UserContext); // Get the authentication state from context
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  // Validate stored auth data on page load
  useEffect(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"));
    if (auth && auth.token) {
      const isTokenValid = () => {
        try {
          const payload = JSON.parse(atob(auth.token.split(".")[1]));
          return payload.exp > Date.now() / 1000; // Check token expiration
        } catch (error) {
          return false; // Invalid token format
        }
      };
      if (isTokenValid()) {
        setState(auth);
      } else {
        window.localStorage.removeItem("auth"); // Remove expired token
        setState(null);
      }
    } else {
      setState(null);
    }
  }, []);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const logout = () => {
    window.localStorage.removeItem("auth"); // Clear auth from storage
    setState(null); // Reset state
    router.push("/login"); // Redirect to login page
  };

  return (
    <AppBar position="static" color="primary" sx={{ backgroundColor: "#FFFF" }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link href="/">
              <Image src={blackLogoImage} alt="Logo" width={100} height={22} />
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
              <Button
                component={Link}
                href="/"
                sx={{
                  color: "black",
                  textTransform: "none",
                  marginRight: "10px",
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                href="/contribution"
                sx={{
                  color: "black",
                  textTransform: "none",
                  marginRight: "10px",
                }}
              >
                Become Contributor
              </Button>
              <Button
                component={Link}
                href="/about"
                sx={{
                  color: "black",
                  textTransform: "none",
                  marginRight: "10px",
                }}
              >
                About
              </Button>
              <Button
                component={Link}
                href="/community"
                sx={{
                  color: "black",
                  textTransform: "none",
                  marginRight: "10px",
                }}
              >
                Community
              </Button>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {state ? (
                <Button
                  onClick={handleMenuOpen}
                  sx={{
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    padding: "0.5rem 1.5rem",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#005bb5" },
                  }}
                >
                  {state.user && state.user.username}
                </Button>
              ) : (
                <Button
                  component={Link}
                  href="/register"
                  sx={{
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                    padding: "0.5rem 1.5rem",
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#005bb5" },
                  }}
                >
                  Login/Register
                </Button>
              )}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ display: { xs: "block", md: "none" }, marginRight: "10px" }}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
          {state && (
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "black",
                  padding: "6px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  href="/dashboard"
                  onClick={handleMenuClose}
                >
                  <DashboardIcon sx={{ marginRight: "10px" }} />
                  Dashboard
                </MenuItem>
                <MenuItem
                  component={Link}
                  href="/user/profile/update"
                  onClick={handleMenuClose}
                >
                  <AccountCircleIcon sx={{ marginRight: "10px" }} />
                  My Profile
                </MenuItem>
                <MenuItem onClick={logout}>
                  <LogoutIcon sx={{ marginRight: "10px" }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          <ListItem button component={Link} href="/" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            href="/contribution"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Become Contributor" />
          </ListItem>
          <ListItem button component={Link} href="/about" onClick={handleDrawerClose}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem
            button
            component={Link}
            href="/community"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Community" />
          </ListItem>
          {state ? (
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem
              button
              component={Link}
              href="/register"
              onClick={handleDrawerClose}
            >
              <ListItemText primary="Login/Register" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
