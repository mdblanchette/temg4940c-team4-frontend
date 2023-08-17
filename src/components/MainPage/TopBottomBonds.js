import {
  ArrowCircleDown,
  ArrowCircleUp,
  CloseOutlined,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import BondDetails from "./BondDetails";

export default function TopBottomBonds() {
  const [openBondDetails, setOpenBondDetails] = useState(false);
  const [bondInfo, setBondInfo] = useState({});

  function handleCloseBondDetails() {
    setOpenBondDetails(false);
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{ paddingBottom: 0, marginBottom: 0 }}
        title="Today's Bond Predictions"
      />
      <BondDetails
        openBondDetails={openBondDetails}
        handleCloseBondDetails={handleCloseBondDetails}
        bondInfo={bondInfo}
      />
      <CardContent sx={{ marginTop: 0, paddingTop: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <ArrowCircleUp /> Top 5 Performing Bonds
          </Grid>
          <Grid item xs={6}>
            <ArrowCircleDown /> Worst 5 Performing Bonds
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 1,
                  ISIN: "US06652KAA16",
                  description: "BKU 4.875 25",
                  coupon: 4.875,
                  maturity: "17-11-2025",
                  rating: "A2",
                  ratingConfidence: 0.54,
                  migration: -385.72,
                  migrationConfidence: 0.5813,
                  price: 92.96,
                  benchmarkSpread: 343.2,
                  benchmarkBond: "2Y",
                  zspread: 373.3,
                });
              }}
            >
              1. US06652KAA16
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 6,
                  ISIN: "US45818WDA18",
                  description: "IADB 0.8 26",
                  coupon: 0.8,
                  maturity: "4-03-2026",
                  rating: "Aaa",
                  ratingConfidence: 0.58,
                  migration: 698.7,
                  migrationConfidence: 0.5813,
                  price: "N/A",
                  benchmarkSpread: "N/A",
                  benchmarkBond: "N/A",
                  zspread: "N/A",
                });
              }}
            >
              6. US45818WDA18
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 2,
                  ISIN: "US059514AE90",
                  description: "BBO 4.375 27",
                  coupon: 4.375,
                  maturity: "3-08-2027",
                  rating: "A2",
                  ratingConfidence: 0.77,
                  migration: -359.81,
                  migrationConfidence: 0.5813,
                  price: 92.128,
                  benchmarkSpread: 240.6,
                  benchmarkBond: "5Y",
                  zspread: 253.6,
                });
              }}
            >
              2. US059514AE90
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 7,
                  ISIN: "US45818WDJ27",
                  description: "IADB 0.8 26",
                  coupon: 0.8,
                  maturity: "19-08-2026",
                  rating: "Aaa",
                  ratingConfidence: 0.49,
                  migration: 683.5,
                  migrationConfidence: 0.5813,
                  price: "N/A",
                  benchmarkSpread: "N/A",
                  benchmarkBond: "N/A",
                  zspread: "N/A",
                });
              }}
            >
              7. US45818WDJ27
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 3,
                  ISIN: "USP09252AM29",
                  description: "BBO 4.375 27",
                  coupon: 4.375,
                  maturity: "3-08-2027",
                  rating: "A2",
                  ratingConfidence: 0.76,
                  migration: -345.97,
                  migrationConfidence: 0.5813,
                  price: 92.125,
                  benchmarkSpread: 240.58,
                  benchmarkBond: "5Y",
                  zspread: 249.92,
                });
              }}
            >
              3. USP09252AM29
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 8,
                  ISIN: "US298785JK32",
                  description: "EIB 0.375 26",
                  coupon: 0.375,
                  maturity: "26-03-2026",
                  rating: "Aaa",
                  ratingConfidence: 0.85,
                  migration: 646.66,
                  migrationConfidence: 0.52,
                  price: 89.463,
                  benchmarkSpread: 10,
                  benchmarkBond: "3Y",
                  zspread: 13.6,
                });
              }}
            >
              8. US298785JK32
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 4,
                  ISIN: "XS2615928863",
                  description: "SBI 4.875 28",
                  coupon: 4.875,
                  maturity: "5-05-2028",
                  rating: "A2",
                  ratingConfidence: 0.52,
                  migration: -323.86,
                  migrationConfidence: 0.5813,
                  price: 98.517,
                  benchmarkSpread: 98.55,
                  benchmarkBond: "5Y",
                  zspread: 119.29,
                });
              }}
            >
              4. XS2615928863
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 9,
                  ISIN: "US298785JQ02",
                  description: "EIB 1.375 27",
                  coupon: 1.375,
                  maturity: "15-03-2027",
                  rating: "Aaa",
                  ratingConfidence: 0.77,
                  migration: 613.69,
                  migrationConfidence: 0.5813,
                  price: 89.577,
                  benchmarkSpread: -2.3,
                  benchmarkBond: "3Y",
                  zspread: 30.5,
                });
              }}
            >
              9. US298785JQ02
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 5,
                  ISIN: "US125581AY44",
                  description: "FCNCA  6 36",
                  coupon: 6.0,
                  maturity: "1-04-2036",
                  rating: "A2",
                  ratingConfidence: 0.47,
                  migration: -292.15,
                  migrationConfidence: 0.4623,
                  price: 85.448,
                  benchmarkSpread: 374.1,
                  benchmarkBond: "10Y",
                  zspread: 416.0,
                });
              }}
            >
              5. US125581AY44
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setOpenBondDetails(true);
                setBondInfo({
                  rank: 10,
                  ISIN: "US222213AU49",
                  description: "CEB 1.375 25",
                  coupon: 1.375,
                  maturity: "27-02-2025",
                  rating: "Aaa",
                  ratingConfidence: 0.9,
                  migration: 603.72,
                  migrationConfidence: 0.5813,
                  price: 94.232,
                  benchmarkSpread: 38.1,
                  benchmarkBond: "2Y",
                  zspread: 18.8,
                });
              }}
            >
              10. US222213AU49
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
