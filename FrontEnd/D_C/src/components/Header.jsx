import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const collapsed = true;
  const navigate = useNavigate();
  const location = useLocation();

  const [storedUser, setStoredUser] = useState(null);

  // Sync user state on navigation/location change
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("campusiq_user") || "null");
      setStoredUser(user);
    } catch (e) {
      setStoredUser(null);
    }
  }, [location]);

  const userName = storedUser?.name || "RAHUL K";
  const userRollId =
    storedUser?.id ||
    storedUser?.studentId ||
    storedUser?.rollId ||
    storedUser?.facultyId ||
    "7376242AD267";

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  const handleLogout = () => {
    handleUserMenuClose();
    localStorage.removeItem("campusiq_user");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "RK";
    const cleaned = name.replace(/^Dr\.\s+/i, "").trim();
    const parts = cleaned.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
        borderBottom: "1px solid #E2E8F0",
        width: `calc(100% - ${collapsed ? "100px" : "290px"})`,
        left: collapsed ? "100px" : "290px",
        transition: "width 0.3s ease, left 0.3s ease",
        height: "72px",
        justifyContent: "center",
        zIndex: 900,
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Left Side: Clean Brand Title */}
        <Typography
          variant="h5"
          sx={{
            color: "#0F172A",
            fontWeight: 800,
            fontSize: "22px",
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            letterSpacing: "-0.02em",
            userSelect: "none",
          }}
        >
          Campus<span style={{ color: "#8B5CF6" }}>IQ</span>
        </Typography>

        {/* Rightmost Side: Profile Component */}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          <Box
            onClick={handleUserMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              py: 0.5,
              px: 1,
              borderRadius: "10px",
              transition: "background-color 0.2s ease",
              "&:hover": { bgcolor: "#F1F5F9" },
            }}
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#8B5CF6",
                background: "linear-gradient(135deg, #8B5CF6 0%, #4F46E5 100%)",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#FFFFFF",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              }}
            >
              {getInitials(userName)}
            </Avatar>

            {/* Stacked Text */}
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  color: "#64748B",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                }}
              >
                {userRollId}
              </Typography>
              <Typography
                sx={{
                  color: "#0F172A",
                  fontWeight: 800,
                  fontSize: "0.925rem",
                  lineHeight: 1.25,
                  mt: 0.2,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {userName}
              </Typography>
            </Box>
          </Box>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                bgcolor: "#FFFFFF",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                mt: 1,
                minWidth: 190,
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.1)",
                fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                "& .MuiMenuItem-root": {
                  py: 1,
                  px: 2,
                  borderRadius: "8px",
                  mx: 0.5,
                  my: 0.2,
                  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  "&:hover": {
                    bgcolor: "#F1F5F9",
                    color: "#4F46E5",
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleUserMenuClose();
                const route = storedUser?.role === "Parent" ? "/parent/profile" : storedUser?.role === "Faculty" ? "/faculty/dashboard" : "/student1_4";
                navigate(route);
              }}
            >
              <ListItemIcon sx={{ color: "#8B5CF6", minWidth: 32 }}>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 600 }} />
            </MenuItem>

            <Divider sx={{ borderColor: "#E2E8F0", my: 0.5 }} />

            <MenuItem onClick={handleLogout} sx={{ color: "#EF4444" }}>
              <ListItemIcon sx={{ color: "#EF4444", minWidth: 32 }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Log Out" primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 700 }} />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;