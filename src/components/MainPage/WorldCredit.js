import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

const time_period = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "2 Years",
  "5 Years",
  "10 Years",
];

export default function WorldCredit({ selectedCountry, selectedCountryCode }) {
  const [sovereignRating, setSovereignRating] = useState("");
  const [averageIssuerRating, setAverageIssuerRating] = useState("");

  async function getCreditData(selectedCountryCode) {
    const fetch_link =
      "http://localhost:3500/macro/creditRating" + "/" + selectedCountryCode;
    console.log(fetch_link);
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  const renderCreditData = async (selectedCountryCode) => {
    const data = await getCreditData(selectedCountryCode);

    setSovereignRating(data["Moodys"]);
    setAverageIssuerRating(data["Average Issuer Rating"]);
  };

  useEffect(() => {
    renderCreditData(selectedCountryCode);
  }, [selectedCountryCode]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader sx={{ paddingBottom: 0 }} title="Credit Analytics" />
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
            <Typography variant="h5">{sovereignRating}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Predicted Spread Change</Typography>
            <Typography variant="h5" color={"red"}>
              -520 bp
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Issuer Rating</Typography>
            <Typography variant="h5">{averageIssuerRating}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Prediction Confidence Level</Typography>
            <Typography variant="h5">%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
