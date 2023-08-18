import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  CardHeader,
} from "@mui/material";
import BondSpreadChart from "./BondSpreadChart";
import BondCreditRatingChart from "./BondCreditRatingChart";

export default function BondBasicInfoCard({
  selectedRow,
  selectedPortfolio,
  dummyIssuerData,
  dummyTableData,
}) {
  // const [predictedIssuerRating, setPredictedIssuerRating] = useState("");

  // useEffect(() => {
  //   if (selectedRow) {
  //     setPredictedIssuerRating(selectedRow.IssuerRating);
  //     console.log(predictedIssuerRating);
  //   } else {
  //     console.log("not here");
  //   }
  //   // const selectedIssuer = selectedRow.Issuer;

  //   // dummyTableData[selectedPortfolio]
  //   // const issuerData = dummyIssuerData.find(
  //   //   (issuer) => issuer.issuer === selectedIssuer
  //   // );

  //   // if (issuerData) {
  //   //   setPredictedIssuerRating(issuerData.predictedIssuerRating);
  //   // }
  //   console.log("selectedRow", selectedRow);
  // }, [selectedRow, selectedPortfolio]);

  const basicinfodata = [
    { title: "Name", subtitle: selectedRow?.BondID || "N/A" },
    { title: "Country", subtitle: selectedRow?.IssuerCountryName || "N/A" },
    { title: "Issuer", subtitle: selectedRow?.IssuerName || "N/A" },
    { title: "Rating", subtitle: selectedRow?.RecentBondRating || "N/A" },
    {
      title: "Credit Spread",
      subtitle:
        `${parseFloat(selectedRow?.CreditSpreadAtPriceDate).toFixed(2)} bp` ||
        "N/A",
    },
    {
      title: "Coupons",
      subtitle: `${parseFloat(selectedRow?.CouponRate)} %` || "N/A",
    },
    { title: "Issue Date", subtitle: selectedRow?.IssueDate || "N/A" },
    { title: "Maturity Date", subtitle: selectedRow?.MaturityDate || "N/A" },
    {
      title: "YTM",
      subtitle:
        parseFloat(selectedRow?.BondYTMAtPriceDate).toFixed(2).toString() ||
        "N/A",
    },
    {
      title: "Outstanding Amount",
      subtitle:
        `${parseInt(selectedRow?.FaceOutstanding) / 1000000000} B` || "N/A",
    },
    {
      title: "Bid",
      subtitle: parseFloat(selectedRow?.Bid).toFixed(2).toString() || "N/A",
    },
    {
      title: "Ask",
      subtitle: parseFloat(selectedRow?.Ask).toFixed(2).toString() || "N/A",
    },
  ];

  const bondpredictiondata = [
    {
      title: "Predicted Credit Rating",
      subtitle: selectedRow?.PredictedRating || "N/A",
    },
    {
      title: "Migration Probability",
      subtitle: `${parseFloat(selectedRow?.PredictionProbability) * 100} %`,
    } || "N/A",
    {
      title: "Predicted Spread Change",
      subtitle:
        `${parseFloat(selectedRow?.SpreadDelta).toFixed(2)} bp` || "N/A",
    },
  ];

  return (
    <Card style={{ width: "100%", marginBottom: 20 }}>
      <CardHeader title="Selected Bond Information"></CardHeader>
      <CardContent>
        <Stack spacing={4}>
          {/* <Typography variant="h5">Selected Bond Information</Typography> */}
          <Card>
            <CardHeader title="Basic Information"></CardHeader>
            <CardContent>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  textAlign: "center",
                }}
              >
                {basicinfodata.map((data, index) => (
                  <Stack key={index} sx={{ alignItems: "start" }}>
                    <Typography style={{ marginBottom: "5px" }}>
                      {data.title}
                    </Typography>
                    <Typography variant="h6">{data.subtitle}</Typography>
                  </Stack>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card sx={{ background: "#E0F0FF" }}>
            <CardHeader title="Bond Prediction for Year 2024"></CardHeader>
            {/* <Typography variant="h6">Bond Prediction for Year 2024</Typography> */}
            <CardContent>
              <Stack spacing={2}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    textAlign: "center",
                  }}
                >
                  {bondpredictiondata.map((data, index) => (
                    <Stack sx={{ alignItems: "start" }} key={index}>
                      <Typography style={{ marginBottom: "5px" }}>
                        {data.title}
                      </Typography>
                      <Typography variant="h6">{data.subtitle}</Typography>
                    </Stack>
                  ))}
                </div>
                <Typography>
                  {" "}
                  Confidence Level:{" "}
                  <Typography component="span" fontWeight="bold">
                    {(parseFloat(selectedRow?.SpreadConfidence) * 100).toFixed(
                      2
                    )}{" "}
                    %
                  </Typography>
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Bond Trends" />
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
        </Stack>
      </CardContent>
    </Card>
  );
}
