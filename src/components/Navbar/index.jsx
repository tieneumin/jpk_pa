import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "darkGreen" }}>
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ textTransform: "capitalize" }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/cardio-warmups"
          sx={{ textTransform: "capitalize" }}
        >
          Cardio Warmups
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/stretching-warmups"
          sx={{ textTransform: "capitalize" }}
        >
          Stretching Warmups
        </Button>
      </Toolbar>
    </AppBar>
  );
}
