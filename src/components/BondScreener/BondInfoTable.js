import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  Grid,
  Stack,
  Button,
  Box,
  Popper,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";

import {
  AddCircleOutlined,
  CloseOutlined,
  AddAlertOutlined,
  MarkChatUnread,
} from "@mui/icons-material";
import { useState, useEffect, memo, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import AlertSetting from "../AlertSetting";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = useRef(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: "100%",
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

export default function BondInfoTable({ searchFilter, handlePredictionInfo }) {
  const countryInfo = [
    { name: "Australia", code: "AUS" },
    { name: "Austria", code: "AUT" },
    { name: "Belgium", code: "BEL" },
    { name: "Canada", code: "CAN" },
    { name: "Chile", code: "CHL" },
    { name: "Costa Rica", code: "CRI" },
    { name: "Czechia", code: "CZE" },
    { name: "Denmark", code: "DNK" },
    { name: "Estonia", code: "EST" },
    { name: "Finland", code: "FIN" },
    { name: "France", code: "FRA" },
    { name: "Germany", code: "DEU" },
    { name: "Greece", code: "GRC" },
    { name: "Hungary", code: "HUN" },
    { name: "Iceland", code: "ISL" },
    { name: "Ireland", code: "IRL" },
    { name: "Israel", code: "ISR" },
    { name: "Italy", code: "ITA" },
    { name: "Japan", code: "JPN" },
    { name: "Korea", code: "KOR" },
    { name: "Latvia", code: "LVA" },
    { name: "Lithuania", code: "LTU" },
    { name: "Luxembourg", code: "LUX" },
    { name: "Mexico", code: "MEX" },
    { name: "Netherlands", code: "NLD" },
    { name: "New Zealand", code: "NZL" },
    { name: "Norway", code: "NOR" },
    { name: "Poland", code: "POL" },
    { name: "Portugal", code: "PRT" },
    { name: "Slovakia", code: "SVK" },
    { name: "Slovenia", code: "SVN" },
    { name: "Spain", code: "ESP" },
    { name: "Sweden", code: "SWE" },
    { name: "Switzerland", code: "CHE" },
    { name: "Turkey", code: "TUR" },
    { name: "United Kingdom", code: "GBR" },
    { name: "United States of America", code: "USA" },
  ];

  function getCountryNameFromCode(code) {
    const country = countryInfo.find((country) => country.code === code);
    return country ? country.name : null;
  }

  function getCountryCodeFromName(name) {
    const country = countryInfo.find((country) => country.name === name);
    return country ? country.code : null;
  }

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
  };

  const [alertSetting, setAlertSetting] = useState({
    Indicator: "Based on Predicted Rating Migration",
    valueSpread: [0, 1000],
    chosenRatingTarget: ["Aaa", "Aa1", "Aa2"],
    chosenAlertDirection: [],
    migrationProbability: [0, 100],
  });

  const [isBondAdded, setIsBondAdded] = useState(false);
  const portfolioOption = ["Portfolio A", "Portfolio B", "New Portfolio"];
  const [chosenBond, setChosenBond] = useState();
  const [displayedBond, setDisplayedBond] = useState([]);
  const apiEndPoint = "http://localhost:3500/";
  const [openAlertModal, setOpenAlertModal] = useState(false);
  //dummy function for now, the idea is to get the value of the selected row/bond and later use it for Watchlist/other
  function handleAddRow(rowData) {
    //setSelectedRows((prevRows) => [...prevRows, rowData]);
    console.log(rowData);
    setChosenBond(rowData);
    setIsBondAdded(true);
  }

  function handleAlertSetting(newSetting) {
    setAlertSetting(newSetting);
  }

  function AddBondModal() {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleClickSetting}>
              <CloseOutlined />
            </IconButton>
          }
          title="Save Bond"
        />
        <CardContent>
          <Stack spacing={4}>
            <Grid container>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Typography>Bond ID</Typography>
                  <Typography variant="h5">{chosenBond.BondID}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <Typography>Bond Issuer</Typography>
                  <Typography variant="h5">{chosenBond.Issuer}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={2}>
                <Stack spacing={1}>
                  <Typography>Bond Rating</Typography>
                  <Typography variant="h5">
                    {chosenBond.MoodysRating ? chosenBond.MoodysRating : "N/A"}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Stack spacing={2} direction="row">
              <Typography>Add to </Typography>
              <TextField select size="small" variant="standard">
                {portfolioOption.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Button onClick={handleClickSetting} variant="contained">
              Save Bond
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  function handleClickSetting() {
    setIsBondAdded(false);
  }

  function handleCloseAlert(state) {
    setOpenAlertModal(state);
  }

  const rowStyle = (params) => {
    // will be changed later
    const indicator =
      alertSetting.Indicator === "Based on Predicted Rating Migration"
        ? [params.row.MoodysRating, params.row.CouponRate]
        : params.row.CouponRate;

    // Apply conditional styling based on the 'status' property
    if (
      alertSetting.Indicator === "Based on Predicted Rating Migration" &&
      alertSetting.chosenRatingTarget.includes(indicator[0]) &&
      indicator[1] > alertSetting.migrationProbability[0] &&
      indicator[1] < alertSetting.migrationProbability[1]
    ) {
      return { backgroundColor: "#F1F8FF" };
    } else if (
      alertSetting.Indicator !== "Based on Predicted Rating Migration" &&
      indicator > alertSetting.valueSpread[0] &&
      indicator < alertSetting.valueSpread[1]
    ) {
      return { backgroundColor: "#F1F8FF" };
    } else {
      return {}; // default
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch(apiEndPoint + "bond");
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data from the API.");
        // }
        // const data = await response.json();

        const retrievedID = ["44658909176", "46633294394", "15628972515"];

        const requests = retrievedID.map((url) =>
          fetch(apiEndPoint + "bond/" + url).then((response) => response.json())
        );
        const data = await Promise.all(requests);

        // Combine all objects into a single array
        const rows = data.flatMap((obj) => Object.values(obj));

        console.log(rows);
        // var normalizedData = rows.map(function (obj) {
        //   var normalizedObj = {};

        //   for (var key in obj) {
        //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //       var normalizedKey = key.trim();
        //       if (normalizedKey === "﻿BondID") normalizedKey = "BondID"; // Correcting the property name
        //       normalizedObj[normalizedKey] = obj[key];
        //     }
        //   }

        //   // if (
        //   //   normalizedObj.BondID === "46633294394" ||
        //   //   normalizedObj.BondID === "44658909176"
        //   // ) {
        //   //   console.log(normalizedObj);
        //   // }

        //   return normalizedObj;
        // });

        setDisplayedBond(rows);
        console.log("displayed bond: ", rows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   // whenever search filter is updated -> retrieve bond datas -> apply filter from Advanced Search
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiEndPoint + "bond");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data from the API.");
  //       }
  //       const data = await response.json();
  //       console.log(data);

  //       var normalizedData = data.map(function (obj) {
  //         var normalizedObj = {};

  //         for (var key in obj) {
  //           if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //             var normalizedKey = key.trim();
  //             if (normalizedKey === "﻿BondID") normalizedKey = "BondID"; // Correcting the property name
  //             normalizedObj[normalizedKey] = obj[key];
  //           }
  //         }

  //         return normalizedObj;
  //       });

  //       // filtering process
  //       var filteredData = normalizedData.filter((bond) => {
  //         if (
  //           !searchFilter.Issuer.includes("All") &&
  //           !searchFilter.Issuer.includes(bond.Issuer)
  //         ) {
  //           return false;
  //         }

  //         // Check if the rating matches the search filter
  //         if (
  //           !searchFilter.Rating.includes("All") &&
  //           !searchFilter.Rating.includes(bond.MoodysRating)
  //         ) {
  //           return false;
  //         }

  //         // Check if the country matches the search filter
  //         if (
  //           !searchFilter.Country.includes("All") &&
  //           !searchFilter.Country.includes(
  //             getCountryNameFromCode(bond["Company Headquarter"])
  //           )
  //         ) {
  //           return false;
  //         }

  //         // Check if the outstanding amount falls within the range
  //         // const outstanding = Math.ceil(parseFloat(bond.FaceOutstanding));
  //         // if (
  //         //   outstanding < parseFloat(searchFilter.Outstanding[0]) ||
  //         //   outstanding > parseFloat(searchFilter.Outstanding[1])
  //         // ) {
  //         //   return false;
  //         // }

  //         // // Check if the issue date is after the specified date
  //         // const issueDate = dayjs(bond.IssueDate, 'MM/DD/YYYY');
  //         // if (issueDate.isBefore(searchFilter.IssueDate)) {
  //         //   return false;
  //         // }

  //         // // Check if the maturity date is before the specified date
  //         // const maturityDate = dayjs(bond.Maturity, 'MM/DD/YYYY');
  //         // if (maturityDate.isAfter(searchFilter.MatureDate)) {
  //         //   return false;
  //         // }

  //         // Check if the coupon rate falls within the range
  //         const couponRate = parseFloat(bond.CouponRate);
  //         if (
  //           couponRate < parseFloat(searchFilter.CouponRate[0]) ||
  //           couponRate > parseFloat(searchFilter.CouponRate[1])
  //         ) {
  //           return false;
  //         }

  //         // If all conditions pass, include the bond in the filtered list
  //         return true;
  //       });

  //       setDisplayedBond(filteredData);

  //       // prediction calculating process
  //       // targetRating (with dummy value credit rating)
  //       let targetRating = filteredData.map((item) =>
  //         ratingToNominalValue[item.MoodysRating]
  //           ? ratingToNominalValue[item.MoodysRating]
  //           : 0
  //       );
  //       targetRating = targetRating.filter((num) => num !== 0);
  //       const sumTargetRating = targetRating.reduce((acc, num) => acc + num, 0);
  //       let averageTargetRating = sumTargetRating / targetRating.length;
  //       for (const rating in ratingToNominalValue) {
  //         if (
  //           ratingToNominalValue[rating] === Math.round(averageTargetRating)
  //         ) {
  //           averageTargetRating = rating;
  //           break;
  //         }
  //       }

  //       //rating migration (dummy: CR)
  //       let ratingMigration = filteredData.map((item) =>
  //         item.CouponRate ? parseFloat(item.CouponRate) : 0
  //       );
  //       ratingMigration = ratingMigration.filter((num) => num !== 0);
  //       const sumRatingMigration = ratingMigration.reduce(
  //         (acc, num) => acc + num,
  //         0
  //       );
  //       console.log("total: ", sumRatingMigration);

  //       handlePredictionInfo({
  //         ratingMigration: sumRatingMigration / ratingMigration.length,
  //         targetRating: averageTargetRating,
  //         spreadChange: sumRatingMigration / ratingMigration.length,
  //         priceCorrelation: sumRatingMigration / ratingMigration.length,
  //       });

  //       console.log("search filter: ", searchFilter);
  //       console.log("filtered data: ", displayedBond);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [searchFilter]);

  // useEffect(() => {
  //   const fetchBondPrices = async () => {
  //     try {
  //       // Fetch bond prices for each bond in displayedBond
  //       const pricePromises = displayedBond.map(async (bond) => {
  //         try{
  //         const response = await fetch(apiEndPoint + `bond/price_history/${bond.BondID}`);
  //         if (!response.ok) {
  //           throw new Error(`Failed to fetch price for BondID ${bond.BondID}`);
  //         }
  //         const priceData = await response.json();
  //         // Update bond with price information
  //         return {
  //           ...bond,
  //           price: priceData.price,
  //         };
  //       } catch(error) {
  //         // Handle error when bond price fetch fails
  //         console.error(`Fetching price for BondID ${bond.BondID} failed:`, error);
  //         // Return null to indicate that price fetch failed for this bond
  //         return null;
  //       }
  //       });

  //       // Wait for all price promises to resolve
  //       const bondsWithPrices = await Promise.all(pricePromises);
  //       // Filter out null values (bonds with failed price fetch)
  //       const validBonds = bondsWithPrices.filter((bond) => bond !== null);

  //       // Update displayedBond with bond prices
  //       console.log(validBonds);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   // Fetch bond prices when displayedBond changes
  //   if (displayedBond.length > 0) {
  //     fetchBondPrices();
  //   }
  // }, [displayedBond]);

  // list of categories
  // const categories = [
  //   { field: "Name", headerName: "Name" },
  //   { field: "Group", headerName: "Group" },
  //   { field: "Issuer", headerName: "Issuer", width: 200 },
  //   { field: "Rating", headerName: "Rating" },
  //   {
  //     field: "Migration",
  //     headerName: "Migration",
  //     renderCell: (params) => (
  //       <span style={{ color: params.value > 0 ? "#0EA371" : "#DC4A41" }}>
  //         {params.value > 0 ? "+" : ""}
  //         {params.value * 100}
  //         {"%"}
  //       </span>
  //     ),
  //   },
  //   {
  //     field: "Spread",
  //     headerName: "Spread",
  //     renderCell: (params) => (
  //       <span style={{ color: params.value > 0 ? "#0EA371" : "#DC4A41" }}>
  //         {params.value > 0 ? "+" : ""}
  //         {params.value}
  //         {" bp"}
  //       </span>
  //     ),
  //   },
  //   { field: "Confidence", headerName: "Confidence" },
  //   { field: "Coupon", headerName: "Coupon" },
  //   { field: "maturityDate", headerName: "Maturity Date", width: 150 },
  //   { field: "Bid", headerName: "Bid" },
  //   { field: "Ask", headerName: "Ask" },
  //   { field: "netChange", headerName: "Net Change" },
  //   { field: "Sector", headerName: "Sector" },
  //   {
  //     field: "actions",
  //     headerName: "Save Bond",
  //     type: "actions",
  //     align: "center",
  //     renderCell: (params) => (
  //       <IconButton onClick={() => handleAddRow(params.row)}>
  //         <AddCircleOutlined sx={{ color: "#007AF5" }} />
  //       </IconButton>
  //     ),
  //   },
  // ];

  // useEffect(() => {
  //   if (!searchFilter) {
  //     // Handle the case when the searchFilter is not available
  //     console.log("N/A");
  //     return;
  //   }

  //   console.log(searchFilter);

  //   const getSpecificBondDatas = async () => {
  //     const rawResponse = await fetch("http://localhost:3500/credit/bonds", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ countries: ["USA"] }),
  //     });

  //     const res = await rawResponse.json();

  //     //console.log(content);

  //     // const getSpecificBondDatas = async () => {
  //     //   const { data: res } = await axios.post(apiEndPoint + "credit/bonds", {
  //     //     countries: ["USA", "CAN"],
  //     //     ratings: ["A1", "A2"],
  //     //     // ...(searchFilter.Country?.includes("All")
  //     //     //   ? {}
  //     //     //   : { countries: searchFilter.Country }),
  //     //     // ...(searchFilter.Rating?.includes("All")
  //     //     //   ? {}
  //     //     //   : { ratings: searchFilter.Rating }),
  //     //     // ...(searchFilter.Issuer?.includes("All")
  //     //     //   ? {}
  //     //     //   : { issuers: searchFilter.Issuer }),
  //     //   });

  //     setDisplayedBond(res);
  //     console.log("Filtered Bonds:", res);
  //   };

  //   getSpecificBondDatas();
  // }, [searchFilter]);

  const categories = [
    {
      field: "BondID",
      headerName: "Bond ID",
      width: 140,
      align: "left",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Company Headquarter",
      headerName: "Country",
      width: 180,
      align: "left",
      headerClassName: "super-app-theme--header",
      renderCell: renderCellExpand,
      valueGetter: (params) => {
        return getCountryNameFromCode(params.value);
      },
      valueFormatter: (params) => {
        if (!params.value) {
          return "N/A";
        } else {
          return getCountryNameFromCode(params.value);
        }
      },
    },
    {
      field: "MoodysRating",
      headerName: "Credit Rating",
      width: 120,
      align: "left",
      headerClassName: "super-app-theme--header",
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "Issuer",
      headerName: "Issuer",
      width: 200,
      align: "left",
      headerClassName: "super-app-theme--header",
      renderCell: renderCellExpand,
    },
    {
      field: "MoodyIssuerRating",
      headerName: "Issuer Rating",
      width: 120,
      align: "left",
      headerClassName: "super-app-theme--header",
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "IssueDate",
      headerName: "Issue Date",
      type: "date",
      align: "left",
      width: 120,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) =>
        params.value ? dayjs(params.value).format("DD/MM/YYYY") : null,
      valueFormatter: (params) => {
        try {
          const date = new Date(params.value);
          if (date instanceof Date && !isNaN(date.getTime())) {
            return `${params.value.toLocaleString()}`;
          } else {
            return "N/A";
          }
        } catch (error) {
          return "N/A";
        }
      },
    }, //DD/MM/YYY format
    {
      field: "Maturity",
      headerName: "Mature Date",
      type: "date",
      align: "left",
      width: 120,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) =>
        params.value ? dayjs(params.value).format("DD/MM/YYYY") : null,
      valueFormatter: (params) => {
        try {
          const date = new Date(params.value);
          if (date instanceof Date && !isNaN(date.getTime())) {
            return `${params.value.toLocaleString()}`;
          } else {
            return "N/A";
          }
        } catch (error) {
          return "N/A";
        }
      },
    },
    {
      field: "CouponFrequency",
      headerName: "Maturity",
      type: "number",
      align: "left",
      headerClassName: "super-app-theme--header",
      valueGetter: ({ row }) => {
        if (!row.IssueDate || !row.Maturity) {
          return null;
        }
        return (
          (dayjs(row.Maturity) - dayjs(row.IssueDate)) /
          (1000 * 60 * 60 * 24 * 365)
        );
      },
      valueFormatter: (params) => {
        if (params.value == null || params.value == undefined) {
          return "N/A";
        } else {
          if (params.value < 1) {
            return "< 1 year";
          } else {
            return `${Math.round(params.value).toLocaleString()} years`;
          }
        }
      },
    },
    {
      field: "CouponRate",
      headerName: "Coupon Rate",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value);
      },
      valueFormatter: (params) => {
        if (params.value == null) {
          return "N/A";
        }
        return `${params.value.toLocaleString()} %`;
      },
      type: "number",
      width: 120,
      align: "left",
    },
    {
      field: "FaceOutstanding",
      width: 110,
      type: "number",
      align: "left",
      headerName: "Outstanding",
      describe:
        "Number of outstanding bonds. If 0, then it's already expired/matured.",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseInt(params.value);
      },
      valueFormatter: (params) => {
        if (params.value == null) {
          return "N/A";
        }
        return `${parseFloat(params.value / 1000000000).toLocaleString()} B`;
      },
    },
    {
      field: "Actions",
      headerName: "Save",
      describe: "Save bond of your interest",
      type: "actions",
      align: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <IconButton onClick={() => handleAddRow(params.row)}>
          <AddCircleOutlined sx={{ color: "#007AF5" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              setOpenAlertModal(true);
              console.log("displayed bonds: ", displayedBond);
            }}
          >
            <AddAlertOutlined />
          </IconButton>
        }
        title="Basic Information"
      />
      {/* {searchFilter && searchFilter.Country && (
        <Typography>{searchFilter.Country}</Typography>
      )} */}
      <CardContent>
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#F1F8FF",
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        >
          <DataGrid
            //loading={!displayedBond.length}
            rows={displayedBond}
            columns={categories}
            disableRowSelectionOnClick
            getRowId={(row) => row.BondID}
            defaultViewOptions={25}
            renderCell
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              columns: { columnVisibilityModel: { BondID: false } },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            getRowClassName={rowStyle}
            headerClassName="column-header"
            headerCellClassName="column-header"
          />
        </Box>
      </CardContent>

      <Dialog
        open={isBondAdded}
        close={handleClickSetting}
        maxWidth="lg"
        fullWidth
      >
        <AddBondModal
          portfolios={portfolioOption}
          handleClose={handleClickSetting}
        />
      </Dialog>

      <Dialog
        open={openAlertModal}
        close={() => setOpenAlertModal(false)}
        maxWidth="md"
        fullWidth
      >
        <Card>
          <CardHeader
            title="Alert Setting"
            action={
              <IconButton onClick={() => setOpenAlertModal(false)}>
                <CloseOutlined />
              </IconButton>
            }
          />
          <AlertSetting
            handleIndicator={handleAlertSetting}
            handleCloseSetting={handleCloseAlert}
          />
        </Card>
      </Dialog>
    </Card>
  );
}
