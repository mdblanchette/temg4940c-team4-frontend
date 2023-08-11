import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const time_period = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "2 Years",
  "5 Years",
  "10 Years",
];

export default function WorldCredit({ selectedCountry }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{ paddingBottom: 0 }}
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
        title="Credit Analytics"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography>Country</Typography>
            <Typography variant="h5">{selectedCountry}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Credit Rating Migration</Typography>
            <Typography variant="h5" color="green">
              +20.1%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Sovereign Rating</Typography>
            <Typography variant="h5">AAA</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Predicted Spread Change</Typography>
            <Typography variant="h5" color={"red"}>
              -520 bp
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Issuer Rating</Typography>
            <Typography variant="h5">AAA</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Prediction Confidence Level</Typography>
            <Typography variant="h5">74.3%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
