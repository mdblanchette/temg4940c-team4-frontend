import { Grid, Card, CardContent, CardHeader, Typography } from "@mui/material";
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

export default function WorldCredit({
  selectedCountryCode,
  selectedCountryFlag,
}) {
  const [sovereignRating, setSovereignRating] = useState("N/A");
  const [averageIssuerRating, setAverageIssuerRating] = useState("N/A");
  const [averageCreditRatingMigration, setAverageCreditRatingMigration] =
    useState("N/A");

  async function getCreditData(selectedCountryCode) {
    const fetch_link =
      "http://localhost:3500/macro/creditRating" + "/" + selectedCountryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  async function getPredictionData(selectedCountryCode) {
    const fetch_link =
      "http://localhost:3500/prediction/creditMigration2024/country/" +
      selectedCountryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  const renderCreditData = async (selectedCountryCode) => {
    const data = await getCreditData(selectedCountryCode);
    const predictionData = await getPredictionData(selectedCountryCode);

    setSovereignRating(data["Moodys"]);
    setAverageIssuerRating(data["Average Issuer Rating"]);
    const countryMigration =
      predictionData["Yearly Average Credit Migration"] !== "N/A"
        ? parseFloat(predictionData["Yearly Average Credit Migration"]).toFixed(
            3
          )
        : "N/A";
    setAverageCreditRatingMigration(countryMigration);
  };

  function colorCode(value) {
    if (value === "N/A" || selectedCountryCode === "Global") return "black";
    value = parseFloat(value);
    if (value >= 2) return "#009444";
    else if (value >= 1) return "#8dc740";
    else if (value >= 0) return "#edea42";
    else if (value >= -1) return "#f46522";
    else return "#ed1c25";
  }

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
            <Typography variant="h5">
              {selectedCountryFlag + " " + selectedCountryCode}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Credit Rating Migration</Typography>
            <Typography
              variant="h5"
              color={colorCode(averageCreditRatingMigration)}
            >
              {selectedCountryCode === "Global"
                ? "-"
                : averageCreditRatingMigration === "N/A"
                ? "N/A"
                : averageCreditRatingMigration + "%"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Sovereign Rating</Typography>
            <Typography variant="h5">
              {selectedCountryCode === "Global"
                ? "-"
                : sovereignRating.replace(/\s/g, "")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Predicted Spread Change</Typography>
            <Typography variant="h5" color={"red"}>
              {selectedCountryCode === "Global" ? "-" : "-520 bp"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Issuer Rating</Typography>
            <Typography variant="h5">
              {selectedCountryCode === "Global" ? "-" : averageIssuerRating}
            </Typography>
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
