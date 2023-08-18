import {
  Typography,
  Box,
  Stack,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
} from "@mui/material";
import { Chart } from "../MainPage/chart";
import { alpha, useTheme } from "@mui/material/styles";

import { useState, useEffect } from "react";
import BondSpreadChart from "../WatchList/BondSpreadChart";
import BondCreditRatingChart from "../WatchList/BondCreditRatingChart";

export default function BondTrendCard() {
  return (
    <Card>
      <CardHeader title="Average Bond Trends" />
      <CardContent>
        <Box
          style={{
            background: "white",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <BondSpreadChart />
          <BondCreditRatingChart />
        </Box>
      </CardContent>
    </Card>
  );
}
