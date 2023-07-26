import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
  const { isLoggedIn, username , isAdmin, logout } = useContext(AuthContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleSignOut = () => {
    // Implement your sign-out logic here
    // Clear the stored user information from local storage
    logout();
  };

  const handleSignIn = () => {
    window.location.href = '/signin';
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {username ? (
          <>
            <IconButton sx={{ fontSize: '0.8rem' }}>
              <PersonOutlinedIcon />
              {isAdmin ? 'admin' : username}
            </IconButton>
            <IconButton sx={{ fontSize: '0.8rem' }} onClick={handleSignOut}>
              Sign Out
            </IconButton>
          </>
        ) : (
          <IconButton  sx={{ fontSize: '0.8rem' }} onClick={handleSignIn}> 
            <PersonOutlinedIcon />
            Sign In
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
