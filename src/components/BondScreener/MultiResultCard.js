import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Stack,
  Dialog,
  IconButton,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";

import { useState, useEffect } from "react";
import { CloseOutlined, Search } from "@mui/icons-material";

import BondPredictionCard from "./BondPredictionCard";
import AdvancedSetting from "./AdvancedSearchSetting";
import BondInfoTable from "./BondInfoTable";
import BondTrendCard from "./BondTrend";
import dayjs from "dayjs";
import { countryInfo } from "./BondInfoTable";

export default function MultiResultCard() {
  const apiEndPoint = "http://localhost:3500/";
  const countryNames = countryInfo.map((country) => country.name);
  const [openSetting, setOpenSetting] = useState(false); // open AdvancedSearch, retrieve updated filter
  const [searchTerm, setSearchTerm] = useState(""); // value for dummy search bar
  const [searchFilter, setSearchFilter] = useState({
    Issuer: ["All"],
    Rating: ["All"],
    Country: ["All"],
    Outstanding: [0, 10],
    IssueDate: dayjs("1990-01-01").format(),
    MatureDate: dayjs("2050-01-01").format(),
    FinalRating: ["All"],
    MigrationProbability: [0, 100],
    CouponRate: [0, 100],
    SpreadChange: [0, 100000],
    ChangeDirection: [],
  }); // filter for displayed bonds
  const [predictionData, setPredictionData] = useState({
    ratingMigration: 20.1,
    targetRating: "",
    spreadChange: 100,
    priceCorrelation: 15.7,
  }); // prediction data for BondPrediction
  const [displayedBond, setDisplayedBond] = useState([]); // filtered bonds data fir BondInfoTable

  const [selectedTrend, setSelectedTrend] = useState("Rating"); // option for BondTrend
  const [dataATrend, setDataATrend] = useState([]); // data to be passed for BondTrend

  const ratingToNominalValue = {
    Aaa: 1,
    Aa1: 2,
    Aa2: 3,
    Aa3: 4,
    A1: 5,
    A2: 6,
    A3: 7,
    Baa1: 8,
    Baa2: 9,
    Baa3: 10,
    Ba1: 11,
    Ba2: 12,
    Ba3: 13,
    B1: 14,
    B2: 15,
    B3: 16,
    Caa1: 17,
    Caa2: 18,
    Caa3: 19,
    Ca: 20,
    C: 21,
  }; // helper function for calculating prediction data

  // helper function to filter data
  function getCountryNameFromCode(code) {
    const country = countryInfo.find((country) => country.code === code);
    return country ? country.name : null;
  }

  function getCountryCodeFromName(name) {
    const country = countryInfo.find((country) => country.name === name);
    return country ? country.code : null;
  }
  function handleSearch(newSearchFilter) {
    setSearchFilter(newSearchFilter);
    console.log("updated filter: ", searchFilter);
  } // function passed to AdvancedSearch to update searching filter

  function handleSearchInput(event) {
    setSearchTerm(event.target.value);
  } // show value in dummy search bar

  function handleCloseSetting(state) {
    setOpenSetting(state);
  } // passed to AdvancedSearch to close

  // retrieved filtered bond datas & first time showing datas
  useEffect(() => {
    // whenever search filter is updated -> retrieve bond datas -> apply filter from Advanced Search
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndPoint + "bond/all/withPred");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }
        const data = await response.json();
        console.log(data);

        // var normalizedData = data.map(function (obj) {
        //   var normalizedObj = {};

        //   for (var key in obj) {
        //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //       var normalizedKey = key.trim();
        //       if (normalizedKey === "﻿BondID") normalizedKey = "BondID"; // Correcting the property name
        //       normalizedObj[normalizedKey] = obj[key];
        //     }
        //   }

        //   return normalizedObj;
        // });

        // const retrievedID = ["44658909176", "46633294394", "15628972515"];

        // const requests = retrievedID.map((url) =>
        //   fetch(apiEndPoint + "bond/" + url).then((response) => response.json())
        // );
        // const data = await Promise.all(requests);

        // // Combine all objects into a single array
        // const rows = data.flatMap((obj) => Object.values(obj));

        // filtering process
        var filteredData = data.filter((bond) => {
          //exclude bonds that are already expired/matured and withdrawn, pre-eliminary filtering
          if (
            bond.AssetStatusDescription === "Expired/Matured" ||
            bond.RecentBondRating === "WR" ||
            !bond.RIC
          ) {
            return false;
          }

          if (
            !searchFilter.Country.includes("All") &&
            !searchFilter.Country.includes(
              getCountryNameFromCode(bond.IssuerCountry)
            )
          ) {
            return false;
          } // country filtering

          if (
            !searchFilter.Issuer.includes("All") &&
            !searchFilter.Issuer.includes(bond.IssuerName)
          ) {
            return false;
          } // issuer filtering

          if (
            !searchFilter.Rating.includes("All") &&
            !searchFilter.Rating.includes(bond.RecentBondRating)
          ) {
            return false;
          } // current rating filtering

          const migrationProbability =
            parseFloat(bond.PredictionProbability) * 100;
          if (
            !migrationProbability ||
            migrationProbability === "N/A" ||
            migrationProbability <
              parseFloat(searchFilter.MigrationProbability[0]) ||
            migrationProbability >
              parseFloat(searchFilter.MigrationProbability[1])
          ) {
            return false;
          } // probanility migration filtering

          // Check if the final rating matches the search filter
          if (
            !searchFilter.FinalRating.includes("All") &&
            !searchFilter.FinalRating.includes(bond.PredictedRating)
          ) {
            return false;
          }

          // const spreadChange = parseFloat(bond.SpreadDelta);
          // if (
          //   isNaN(spreadChange) ||
          //   Math.abs(spreadChange) < parseFloat(searchFilter.changeSpread[0]) ||
          //   Math.abs(spreadChange) > parseFloat(searchFilter.changeSpread[1])
          // ) {
          //   return false;
          // }
          // spread change prediction filtering

          const outstandingAmount =
            parseFloat(bond.FaceOutstanding) / 1000000000;
          if (
            outstandingAmount < parseFloat(searchFilter.Outstanding[0]) ||
            outstandingAmount > parseFloat(searchFilter.Outstanding[1])
          ) {
            return false;
          } // outstanding filtering

          // // // Check if the issue date is after the specified date
          // // const issueDate = dayjs(bond.IssueDate, 'MM/DD/YYYY');
          // // if (issueDate.isBefore(searchFilter.IssueDate)) {
          // //   return false;
          // // }

          // // // Check if the maturity date is before the specified date
          // // const maturityDate = dayjs(bond.Maturity, 'MM/DD/YYYY');
          // // if (maturityDate.isAfter(searchFilter.MatureDate)) {
          // //   return false;
          // // }

          // Check if the coupon rate falls within the range
          const couponRate = parseFloat(bond.CouponRate);
          if (
            couponRate < parseFloat(searchFilter.CouponRate[0]) ||
            couponRate > parseFloat(searchFilter.CouponRate[1])
          ) {
            return false;
          }

          // If all conditions pass, include the bond in the filtered list
          return true;
        });

        setDisplayedBond(filteredData);
        console.log("search filter: ", searchFilter);
        console.log("filtered data: ", filteredData.length, displayedBond);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchFilter]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         apiEndPoint + "macro/governmentSpending/CAN"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data from the API.");
  //       }
  //       const data = await response.json();
  //       const valuesArray = Object.entries(data)
  //         .filter(([key]) => !isNaN(key) && Number(key) >= 2013)
  //         .map(([_, value]) => value); // Extract values from filtered entries

  //       console.log(valuesArray);
  //       setDataATrend(valuesArray);
  //       console.log(dataATrend);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // generate data for trend
  // useEffect(() => {
  //   const fetchBondPrices = async () => {
  //     try {
  //       // Fetch bond prices for each bond in displayedBond
  //       const pricePromises = displayedBond.map(async (bond) => {
  //         try {
  //           const response = await fetch(
  //             apiEndPoint + `bond/history/${bond.RIC}`
  //           );
  //           if (!response.ok) {
  //             throw new Error(
  //               `Failed to fetch price for BondID ${bond.BondID}`
  //             );
  //           }
  //           const priceData = await response.json();
  //           // Update bond with price information
  //           return {
  //             ...bond,
  //             price: priceData.price,
  //           };
  //         } catch (error) {
  //           // Handle error when bond price fetch fails
  //           console.error(
  //             `Fetching price for BondID ${bond.BondID} failed:`,
  //             error
  //           );
  //           // Return null to indicate that price fetch failed for this bond
  //           return null;
  //         }
  //       });

  //       // Wait for all price promises to resolve
  //       const bondsWithPrices = await Promise.all(pricePromises);
  //       console.log("price data: ", bondsWithPrices);
  //       // Filter out null values (bonds with failed price fetch)
  //       const validBonds = bondsWithPrices.filter((bond) => bond !== null);

  //       const valuesArray = Object.entries(validBonds)
  //         .filter(([key]) => !isNaN(key) && Number(key) >= 2013)
  //         .map(([_, value]) => value); // Extract values from filtered entries

  //       // Update displayedBond with bond prices
  //       console.log(valuesArray);
  //       setDataATrend(valuesArray);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchBondPrices();
  // }, [displayedBond]);

  // generate data for prediction
  useEffect(() => {
    // targetRating (with dummy value credit rating)
    let targetRating = displayedBond.map((item) =>
      ratingToNominalValue[item.PredictedRating]
        ? ratingToNominalValue[item.PredictedRating]
        : 0
    );
    targetRating = targetRating.filter((num) => num !== 0);
    const sumTargetRating = targetRating.reduce((acc, num) => acc + num, 0);
    let averageTargetRating = sumTargetRating / targetRating.length;

    for (const rating in ratingToNominalValue) {
      if (ratingToNominalValue[rating] === Math.round(averageTargetRating)) {
        averageTargetRating = rating;
        break;
      }
    }

    //rating migration (dummy: CR)
    let ratingMigration = displayedBond.map((item) =>
      !isNaN(item.PredictionProbability)
        ? parseFloat(item.PredictionProbability) * 100
        : 0
    );
    ratingMigration = ratingMigration.filter((num) => num !== 0);
    const sumRatingMigration = ratingMigration.reduce(
      (acc, num) => acc + num,
      0
    );
    let averageRatingMigration = sumRatingMigration / ratingMigration.length;

    let spreadChangeRaw = displayedBond.map((item) =>
      !isNaN(item.SpreadDelta) ? parseFloat(item.SpreadDelta) : 0
    );

    spreadChangeRaw = spreadChangeRaw.filter((num) => num !== 0);
    const sumSpreadChangeRaw = spreadChangeRaw.reduce(
      (acc, num) => acc + num,
      0
    );
    let avgSpreadChange = sumSpreadChangeRaw / spreadChangeRaw.length;

    let confidenceLevel = displayedBond.map((item) =>
      !isNaN(item.SpreadConfidence) ? parseFloat(item.SpreadConfidence) : 0
    );

    confidenceLevel = confidenceLevel.filter((num) => num !== 0);
    const sumConfidenceLevel = confidenceLevel.reduce(
      (acc, num) => acc + num,
      0
    );
    let avgConfidenceLevel = sumConfidenceLevel / confidenceLevel.length;

    setPredictionData({
      ratingMigration: averageRatingMigration,
      targetRating: averageTargetRating,
      spreadChange: avgSpreadChange,
      priceCorrelation: avgConfidenceLevel * 100,
    });
  }, [displayedBond]);

  return (
    <Card fullWidth sx={{ width: "100%" }}>
      <CardContent>
        <Stack spacing={2}>
          {/* title of the card */}
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Bond Information
            </Typography>

            <Button variant="contained" onClick={() => setOpenSetting(true)}>
              Advanced Search
            </Button>

            <Dialog
              open={openSetting}
              close={() => setOpenSetting(false)}
              fullWidth
              maxWidth="lg"
            >
              {/* <DialogContent style={{ width: "80vw" }}> */}
              <Card>
                <CardHeader
                  action={
                    <IconButton onClick={() => setOpenSetting(false)}>
                      <CloseOutlined />
                    </IconButton>
                  }
                  title="Advanced Search"
                />
                <CardContent>
                  <AdvancedSetting
                    handleUpdate={handleSearch}
                    handleClose={handleCloseSetting}
                  />
                </CardContent>
              </Card>
              {/* </DialogContent> */}
            </Dialog>
          </Box>

          {/* search bar */}
          <Stack spacing={1} direction="row" alignItems="center">
            <TextField
              placeholder="Type to search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchInput}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            {/* <IconButton>
              <Search />
            </IconButton> */}
          </Stack>

          <BondInfoTable dataBonds={displayedBond} />
          <BondPredictionCard predictionData={predictionData} />
          {/* <BondTrendCard
            indicatorA="Average Price History"
            dataA={dataATrend}
          /> */}
        </Stack>
      </CardContent>
    </Card>
  );
}
