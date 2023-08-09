import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MacroChart from "./MacroChart";
import IndicatorDropdown from "./IndicatorDropdown";

const time_period = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "2 Years",
  "5 Years",
  "10 Years",
];

const indicators = [
  "GDP Growth Rate",
  "Interest Rate",
  "Inflation Rate",
  "Unemployment Rate",
  "Government Debt to GDP",
  "Government Spending",
  "Balance of Trade",
  "Current Account to GDP",
  "Credit Rating",
  "Corporate Tax Rate",
];

export default function MacroeconomicIndicators() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{ paddingBottom: 0 }} // Adjust the padding here
        action={
          <TextField
            select
            defaultValue={"Today"}
            size="small"
            variant="standard"
          >
            {time_period.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        }
        title="Macroeconomic Indicators"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <MacroChart />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IndicatorDropdown
                label="Indicator A"
                defaultValue="GDP Growth Rate"
              />
              <IndicatorDropdown
                label="Indicator B"
                defaultValue="Interest Rate"
              />
            </Box>
          </Grid>
          <Grid container xs={6} spacing={2}>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
            <Grid item xs={6}>
              <IndicatorDropdown
                label="Indicator"
                defaultValue="Inflation Rate"
              />
              <Typography variant="h5">XXX</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
