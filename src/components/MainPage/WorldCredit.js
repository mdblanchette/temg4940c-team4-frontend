import { Grid, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { set } from "date-fns";
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
    useState(0);
  const [averagePredictedSpreadChange, setAveragePredictedSpreadChange] =
    useState(0);
  const [confidence, setConfidence] = useState(0);

  async function getCreditData(selectedCountryCode) {
    const fetch_link =
      "http://35.220.165.226/api/macro/creditRating" +
      "/" +
      selectedCountryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  async function getPredictionData(selectedCountryCode) {
    const fetch_link =
      "http://35.220.165.226/api/prediction/creditMigration2024/country/" +
      selectedCountryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  async function getSpreadData(selectedCountryCode) {
    const fetch_link =
      "http://35.220.165.226/api/prediction/spread2024/country/" +
      selectedCountryCode;
    const res = await fetch(fetch_link);
    const parsed_res = await res.json();
    return parsed_res;
  }

  const renderCreditData = async (selectedCountryCode) => {
    const data = await getCreditData(selectedCountryCode);
    setSovereignRating(data["Moodys"]);
    setAverageIssuerRating(data["Average Issuer Rating"]);
    const predictionData = await getPredictionData(selectedCountryCode);

    // //Round to nearest integer
    if (predictionData["Yearly Average Credit Migration"] === "N/A") {
      setAverageCreditRatingMigration(0);
    } else {
      setAverageCreditRatingMigration(
        Math.round(
          parseFloat(predictionData["Yearly Average Credit Migration"])
        )
      );
    }

    const spreadData = await getSpreadData(selectedCountryCode);
    setAveragePredictedSpreadChange(
      parseInt(spreadData["AveragePredictedSpread"])
    );
    setConfidence(
      parseFloat(spreadData["AverageSpreadConfidence"] * 100).toFixed(2) + "%"
    );
  };

  function colorCode(value) {
    if (value === 0 || value === "N/A" || selectedCountryCode === "Global")
      return "black";
    value = parseFloat(value);
    if (value > 0) return "#009444";
    else if (value === 0) return "#edea42";
    else return "#ed1c25";
  }

  useEffect(() => {
    renderCreditData(selectedCountryCode);
  }, [selectedCountryCode]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{ paddingBottom: 0 }}
        title="Credit Analytics (Moody's)"
      />
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
                : averageCreditRatingMigration === 0
                ? "No Change"
                : averageCreditRatingMigration === 1
                ? "+" + averageCreditRatingMigration + " Notch"
                : averageCreditRatingMigration === -1
                ? averageCreditRatingMigration + " Notch"
                : averageCreditRatingMigration > 1
                ? "+" + averageCreditRatingMigration + " Notches"
                : averageCreditRatingMigration + " Notches"}
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
            <Typography variant="h5">
              {selectedCountryCode === "Global"
                ? "-"
                : averagePredictedSpreadChange + " bps"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Average Issuer Rating</Typography>
            <Typography variant="h5">
              {selectedCountryCode === "Global" ? "-" : averageIssuerRating}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Confidence</Typography>
            <Typography variant="h5">{confidence}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
