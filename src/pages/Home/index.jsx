import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box textAlign="center" sx={{ my: 12 }}>
      <Typography
        variant="h4"
        color="darkGreen"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Welcome to the Warm-up Exercise Planner
      </Typography>
      <Typography>
        This is the homepage. Use the navigation links to explore!
      </Typography>
    </Box>
  );
}
