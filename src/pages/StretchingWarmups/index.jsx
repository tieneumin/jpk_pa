import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStretchingWarmups } from "../../utils/api_warmups";

export default function StretchingWarmups() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const {
    data: stretchingWarmups = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stretchingWarmups", search, page, limit],
    queryFn: () => getStretchingWarmups(search, page, limit),
  });

  return (
    <Box sx={{ my: 4, mx: 16 }}>
      <Typography
        variant="h5"
        color="darkGreen"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Stretching Warmups
      </Typography>

      <Box display="flex" justifyContent="space-between" sx={{ my: 4 }}>
        <Box display="flex" alignItems="center">
          <Typography>Search by Name/Body Part:</Typography>
          <TextField
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            sx={{ backgroundColor: "#fff", mx: 2 }}
          />
        </Box>

        <Box display="flex" alignItems="center">
          <Typography>Per Page:</Typography>
          <FormControl sx={{ backgroundColor: "#fff", width: "75px", ml: 2 }}>
            <Select
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box display="flex" justifyContent="center">
          <Typography fontStyle="italic">
            Unable to retrieve stretching warmups
          </Typography>
        </Box>
      ) : search && stretchingWarmups.length === 0 ? (
        <Box display="flex" justifyContent="center">
          <Typography fontStyle="italic">No results found</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {stretchingWarmups.map((warmup, i) => (
              <Grid key={i} size={{ sm: 12, md: 6, lg: 4 }}>
                <Card sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2 }}>
                  <Typography
                    variant="h6"
                    color="darkGreen"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    {warmup.name}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Body Part: {warmup.bodyPart}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    Duration: {warmup.duration}
                  </Typography>
                  <Typography>Calories: {warmup.calories}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              color="darkGreen"
              disabled={page === 1}
              sx={{ backgroundColor: "#fff", textTransform: "capitalize" }}
              onClick={() => {
                setPage((page) => page - 1);
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              color="darkGreen"
              disabled={
                search ? stretchingWarmups.length < limit : 20 / page === limit
              }
              sx={{
                backgroundColor: "#fff",
                textTransform: "capitalize",
                ml: 2,
              }}
              onClick={() => {
                setPage((page) => page + 1);
              }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
