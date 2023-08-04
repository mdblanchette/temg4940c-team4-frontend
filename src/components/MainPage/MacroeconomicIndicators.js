import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import MacroChart from "./MacroChart";

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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <MacroChart type="line" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <MacroChart type="line" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <MacroChart type="line" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <MacroChart type="bar" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <MacroChart type="bar" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Indicator"
              select
              defaultValue={"GDP Growth Rate"}
            >
              {indicators.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <MacroChart type="line" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
