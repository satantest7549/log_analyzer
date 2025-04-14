import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const AppBarHeader = ({ onMenuClick }) => (
  <AppBar position="fixed" color="primary" elevation={4}>
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
      }}
    >
      <IconButton
        color="inherit"
        edge="start"
        onClick={onMenuClick}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden", 
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.25rem", sm: "1.5rem" }, 
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          🧩 Error Log Analyzer
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: "#ddd",
            fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Smaller font size for small screens
          }}
        >
          AI-Driven Insights for Smarter Debugging
        </Typography>
      </Box>

      {/* Empty box for spacing to balance menu icon on left */}
      <Box sx={{ width: { xs: 40, sm: 48 } }} />
    </Toolbar>
  </AppBar>
);

export default AppBarHeader;
