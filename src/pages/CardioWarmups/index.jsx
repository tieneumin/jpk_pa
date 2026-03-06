import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCardioWarmups } from "../../utils/api_warmups";

export default function CardioWarmups() {
  const [intensity, setIntensity] = useState("all");
  const [sort, setSort] = useState("none");
  const {
    data: cardioWarmups = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cardioWarmups", intensity, sort],
    queryFn: () => getCardioWarmups(intensity, sort),
  });

  return (
    <Box sx={{ my: 4, mx: 16 }}>
      <Typography
        variant="h5"
        color="darkGreen"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Cardio Warmups
      </Typography>

      <Box display="flex" alignItems="center" sx={{ my: 4 }}>
        <Typography>Filter by Intensity:</Typography>
        <FormControl sx={{ backgroundColor: "#fff", width: "125px", mx: 2 }}>
          <Select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <Typography>Sort by:</Typography>
        <FormControl sx={{ backgroundColor: "#fff", width: "125px", ml: 2 }}>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box display="flex" justifyContent="center">
          <Typography fontStyle="italic">
            Unable to retrieve cardio warmups
          </Typography>
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "transparent" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "darkGreen" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Intensity
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Body Part
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Duration
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Calories
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardioWarmups.map((warmup, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {warmup.name}
                  </TableCell>
                  <TableCell>{warmup.intensity}</TableCell>
                  <TableCell>{warmup.bodyPart}</TableCell>
                  <TableCell>{warmup.duration}</TableCell>
                  <TableCell>{warmup.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
