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
import dayjs from "dayjs";
import AlertSetting from "../Alert/AlertSetting";

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

function renderCellHighlight(params) {
  if (params.value === "N/A") {
    return <div>{params.value}</div>;
  }

  const predictedRating = ratingToNominalValue[params.value];
  let currentRating = params.row.RecentBondRating;
  currentRating =
    ratingToNominalValue[currentRating === "AA (low)" ? "AA" : currentRating];

  const cellStyle = {
    color: predictedRating <= currentRating ? "#0EA371" : "#DC4A41",
  };

  return <div style={cellStyle}>{params.value}</div>;
}

function renderCellValue(params) {
  if (isNaN(params.value)) {
    return <div>N/A</div>;
  }

  const cellStyle = {
    color: params.value >= 0 ? "#0EA371" : "#DC4A41",
  };

  return <div style={cellStyle}>{params.value} bp</div>;
}

export const countryInfo = [
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

const keyAlertSetting = "alertSetting";
const keyPortfolioList = "portfolioList";

export default function BondInfoTable({ dataBonds }) {
  function getCountryNameFromCode(code) {
    const country = countryInfo.find((country) => country.code === code);
    return country ? country.name : null;
  }

  function getCountryCodeFromName(name) {
    const country = countryInfo.find((country) => country.name === name);
    return country ? country.code : null;
  }

  const [alertSetting, setAlertSetting] = useState({
    Indicator: "Based on Predicted Rating Migration",
    valueSpread: [0, 1000],
    chosenRatingTarget: ["Aaa", "Aa1", "Aa2"],
    chosenAlertDirection: [],
    migrationProbability: [0, 100],
  });

  const [isBondAdded, setIsBondAdded] = useState(false);
  const portfolioOption = ["A", "B", "C", "New"];
  const [chosenPortfolio, setChosenPortfolio] = useState("A");
  const [chosenBond, setChosenBond] = useState("");
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [listPortfolio, setListPortfolio] = useState({
    A: ["44658909176", "15628972515"],
    B: ["46633294394", "44658909176"],
    C: ["15628972515"],
  });

  useEffect(() => {
    const storedAlertSetting = localStorage.getItem(keyAlertSetting);
    if (storedAlertSetting) {
      setAlertSetting(JSON.parse(storedAlertSetting));
    } else {
      setAlertSetting(alertSetting);
    }
  }, []);

  useEffect(() => {
    const storedPortfolio = localStorage.getItem(keyPortfolioList);
    if (storedPortfolio) {
      setListPortfolio(JSON.parse(storedPortfolio));
    } else {
      setListPortfolio(listPortfolio);
    }
  }, []);

  // if new bond added to portfolio
  // useEffect(() => {
  //   if (
  //     chosenBond?.BondID &&
  //     !listPortfolio[chosenPortfolio]?.includes(chosenBond?.BondID)
  //   ) {
  //     console.log("ID: ", chosenBond.BondID);
  //     const updatedList = {
  //       ...listPortfolio,
  //       [chosenPortfolio]: [
  //         ...(listPortfolio[chosenPortfolio] ?? []),
  //         chosenBond.BondID,
  //       ],
  //     };

  //     localStorage.setItem(keyPortfolioList, JSON.stringify(updatedList));
  //     console.log("PORTFOLIO LIST: ", updatedList);
  //   }
  // }, [chosenPortfolio]);

  function SaveBond() {
    if (
      chosenBond &&
      !listPortfolio[chosenPortfolio]?.includes(chosenBond?.BondID)
    ) {
      console.log("ID: ", chosenBond.BondID);
      const updatedList = {
        ...listPortfolio,
        [chosenPortfolio]: [
          ...(listPortfolio[chosenPortfolio] ?? []),
          chosenBond.BondID,
        ],
      };

      localStorage.setItem(keyPortfolioList, JSON.stringify(updatedList));
      console.log("PORTFOLIO LIST: ", updatedList);
    }
    console.log("skip add");
  }

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
                  <Typography variant="h5">{chosenBond.IssuerName}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={2}>
                <Stack spacing={1}>
                  <Typography>Bond Rating</Typography>
                  <Typography variant="h5">
                    {chosenBond.RecentBondRating
                      ? chosenBond.RecentBondRating
                      : "N/A"}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Stack spacing={2} direction="row">
              <Typography>Add to </Typography>
              <TextField select size="small" variant="standard">
                {portfolioOption.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={() => setChosenPortfolio(option)}
                  >
                    Portfolio {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Button
              onClick={() => {
                SaveBond();
                handleClickSetting();
              }}
              variant="contained"
            >
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

  const getRowClassName = (params) => {
    // will be changed later
    const indicator =
      alertSetting.Indicator === "Based on Predicted Rating Migration"
        ? [params.row.PredictedRating, params.row.PredictionProbability]
        : params.row.SpreadDelta;

    let isHighlighted = false;

    if (alertSetting.Indicator === "Based on Predicted Rating Migration") {
      if (
        alertSetting.chosenRatingTarget.includes(indicator[0]) &&
        indicator[1] * 100 >= alertSetting.migrationProbability[0] &&
        indicator[1] * 100 <= alertSetting.migrationProbability[1]
      ) {
        isHighlighted = true;
      }
    } else if (
      !isNaN(indicator) &&
      Math.abs(indicator) > alertSetting.valueSpread[0] &&
      Math.abs(indicator) < alertSetting.valueSpread[1]
    ) {
      if (
        alertSetting.chosenAlertDirection.includes("Up") &&
        alertSetting.chosenAlertDirection.includes("Down")
      ) {
        isHighlighted = true;
      } else if (
        alertSetting.chosenAlertDirection.includes("Up") &&
        !alertSetting.chosenAlertDirection.includes("Down") &&
        indicator > 0
      ) {
        // if spread goes up
        isHighlighted = true;
      } else if (
        !alertSetting.chosenAlertDirection.includes("Up") &&
        alertSetting.chosenAlertDirection.includes("Down") &&
        indicator < 0
      ) {
        isHighlighted = true;
      }
    }

    // return isHighlighted
    //   ? `super-app-theme--Alert${value >= 0 ? "Up" : "Down"}`
    //   : "";

    return isHighlighted ? `super-app-theme--Alerted` : "";
  };

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .super-app-theme--Alerted": {
      backgroundColor: "#FBEDEC",
    },
  }));

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
      field: "IssuerCountry",
      headerName: "Country",
      width: 200,
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
      field: "RecentBondRating",
      headerName: "Credit Rating",
      width: 120,
      align: "left",
      headerClassName: "super-app-theme--header",
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "PredictedRating",
      headerName: "Predicted Rating",
      width: 150,
      align: "left",
      headerClassName: "super-app-theme--header",
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
      renderCell: renderCellHighlight,
    },
    {
      field: "PredictionProbability",
      headerName: "Probability",
      width: 100,
      align: "left",
      type: "number",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value) * 100;
      },
      valueFormatter: (params) => {
        if (params.value == null) {
          return "N/A";
        }
        return `${params.value.toLocaleString()} %`;
      },
    },
    {
      field: "PredictedSpread",
      headerName: "Predicted Spread",
      width: 150,
      align: "left",
      type: "number",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value);
      },
      valueFormatter: (params) => {
        if (params.value == null || isNaN(params.value)) {
          return "N/A";
        }
        return `${params.value.toLocaleString()} bp`;
      },
    },
    {
      field: "SpreadDelta",
      headerName: "Spread Change",
      width: 140,
      align: "left",
      type: "number",
      renderCell: renderCellValue,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value).toFixed(2);
      },
      valueFormatter: (params) => {
        if (params.value == null) {
          return "N/A";
        }
        return `${params.value.toLocaleString()} bp`;
      },
    },
    {
      field: "SpreadConfidence",
      headerName: "Confidence",
      width: 100,
      align: "left",
      type: "number",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value).toFixed(2) * 100;
      },
      valueFormatter: (params) => {
        if (params.value == null || isNaN(params.value)) {
          return "N/A";
        }
        return `${params.value.toLocaleString()} %`;
      },
    },
    {
      field: "IssuerName",
      headerName: "Issuer",
      width: 220,
      align: "left",
      headerClassName: "super-app-theme--header",
      renderCell: renderCellExpand,
    },
    {
      field: "IssuerRating",
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
        params.value ? dayjs(params.value).format("YYYY-MM-DD") : null,
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
      field: "MaturityDate",
      headerName: "Mature Date",
      type: "date",
      align: "left",
      width: 120,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) =>
        params.value ? dayjs(params.value).format("YYYY-MM-DD") : null,
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
    // {
    //   field: "CouponFrequency",
    //   headerName: "Maturity",
    //   type: "number",
    //   align: "left",
    //   headerClassName: "super-app-theme--header",
    //   valueGetter: ({ row }) => {
    //     if (!row.IssueDate || !row.Maturity) {
    //       return null;
    //     }
    //     return (
    //       (dayjs(row.Maturity) - dayjs(row.IssueDate)) /
    //       (1000 * 60 * 60 * 24 * 365)
    //     );
    //   },
    //   valueFormatter: (params) => {
    //     if (params.value == null || params.value == undefined) {
    //       return "N/A";
    //     } else {
    //       if (params.value < 1) {
    //         return "< 1 year";
    //       } else {
    //         return `${Math.round(params.value).toLocaleString()} years`;
    //       }
    //     }
    //   },
    // },
    {
      field: "BondYTMAtPriceDate",
      headerName: "YTM",
      align: "left",
      type: "number",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value).toFixed(2);
      },
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "Bid",
      headerName: "Bid Price",
      type: "number",
      align: "left",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value);
      },
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
    },
    {
      field: "Ask",
      headerName: "Ask Price",
      type: "number",
      align: "left",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return parseFloat(params.value);
      },
      valueFormatter: (params) => (params.value ? params.value : "N/A"),
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
            }}
          >
            <AddAlertOutlined />
          </IconButton>
        }
        title="Basic Information"
      />
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
          <StyledDataGrid
            //loading={!displayedBond.length}
            rows={dataBonds}
            columns={categories}
            disableRowSelectionOnClick
            getRowId={(row) => row.BondID}
            defaultViewOptions={25}
            renderCell
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              columns: {
                columnVisibilityModel: {
                  BondID: false,
                  IssueDate: false,
                  MaturityDate: false,
                  Bid: false,
                  Ask: false,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            getRowClassName={getRowClassName}
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
