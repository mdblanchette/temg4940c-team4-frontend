import {
  ArrowCircleDown,
  ArrowCircleUp,
  CloseOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Typography,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import BondDetails from "./BondDetails";

export default function TopBottomBonds() {
  const [openBondDetails, setOpenBondDetails] = useState(false);
  const [bondInfo, setBondInfo] = useState({});
  const [showTop5, setShowTop5] = useState(true);
  const [seeBonds, setSeeBonds] = useState("Show Best 5 Performing Bonds");
  const top5Bonds = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const bottom5bonds = [
    {
      rank: 1,
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
    },
    {
      rank: 2,
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
    },
    {
      rank: 3,
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
    },
    {
      rank: 4,
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
    },
    {
      rank: 5,
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
    },
  ];

  function handleCloseBondDetails() {
    setOpenBondDetails(false);
  }

  useEffect(() => {
    if (seeBonds === "Show Best 5 Performing Bonds") {
      setShowTop5(true);
    } else {
      setShowTop5(false);
    }
  }, [seeBonds]);

  return (
    <Card>
      <CardHeader
        sx={{ paddingBottom: 0, marginBottom: 0 }}
        title="Today's Bond Predictions"
      />
      <CardContent sx={{ marginTop: 0, paddingTop: 1 }}>
        <Stack spacing={2}>
          <TextField
            select
            defaultValue={seeBonds}
            size="small"
            variant="standard"
            onChange={(e) => setSeeBonds(e.target.value)}
          >
            {[
              "Show Best 5 Performing Bonds",
              "Show Worst 5 Performing Bonds",
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {showTop5 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "20%" }}>Rank</TableCell>
                    <TableCell style={{ width: "20%" }}>ISIN</TableCell>
                    <TableCell style={{ width: "30%" }}>
                      Predicted Final Rating
                    </TableCell>
                    <TableCell style={{ width: "30%" }}>
                      Predicted Spread Change (bp)
                    </TableCell>
                    {/* <TableCell style={{ width: "30%" }}>
                      Spread Change
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {top5Bonds.map((row) => (
                    <TableRow key={row.ISIN}>
                      <TableCell style={{ width: "20%" }}>{row.rank}</TableCell>
                      <TableCell style={{ width: "20%" }}>{row.ISIN}</TableCell>
                      <TableCell style={{ width: "30%" }}>
                        {row.rating}
                      </TableCell>
                      <TableCell style={{ width: "30%" }}>
                        {row.migration}
                      </TableCell>
                      {/* <TableCell style={{ width: "30%" }}>
                        {row.zspread}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "20%" }}>Rank</TableCell>
                    <TableCell style={{ width: "20%" }}>ISIN</TableCell>
                    <TableCell style={{ width: "30%" }}>
                      Predicted Final Rating
                    </TableCell>
                    <TableCell style={{ width: "30%" }}>
                      Predicted Spread Change (bp)
                    </TableCell>
                    {/* <TableCell style={{ width: "30%" }}>
                      Spread Change
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bottom5bonds.map((row) => (
                    <TableRow key={row.ISIN}>
                      <TableCell style={{ width: "20%" }}>{row.rank}</TableCell>
                      <TableCell style={{ width: "20%" }}>{row.ISIN}</TableCell>
                      <TableCell style={{ width: "30%" }}>
                        {row.rating}
                      </TableCell>
                      <TableCell style={{ width: "30%" }}>
                        {row.migration}
                      </TableCell>
                      {/* <TableCell style={{ width: "30%" }}>
                        {row.zspread}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
