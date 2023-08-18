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
import { useState, useEffect, memo, useRef } from "react";
import AlertSetting from "./AlertSetting";
import { AddAlertOutlined, CloseOutlined } from "@mui/icons-material";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { countryInfo } from "../BondScreener/BondInfoTable";

const keyPortfolioList = "portfolioList";
const keyAlertSetting = "alertSetting";

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

export default function InAlertBonds({ handleCloseAlert }) {
  const apiEndPoint = "http://35.220.165.226/api/";
  const [alertSetting, setAlertSetting] = useState({
    Indicator: "Based on Predicted Rating Migration",
    valueSpread: [0, 1000],
    chosenRatingTarget: ["Aaa", "Aa1", "Aa2"],
    chosenAlertDirection: [],
    migrationProbability: [0, 100],
  });
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [displayedBond, setDisplayedBond] = useState([]);
  const [listPortfolio, setListPortfolio] = useState({
    A: ["44658909176"],
    B: ["46633294394", "44658909176"],
  });
  const [listBondID, setListBondID] = useState("A");

  useEffect(() => {
    const storedAlertSetting = localStorage.getItem(keyAlertSetting);
    if (storedAlertSetting) {
      setAlertSetting(JSON.parse(storedAlertSetting));
    } else {
      setAlertSetting(alertSetting);
    }
  }, []);

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

  function handleAlertSetting(newSetting) {
    setAlertSetting(newSetting);
  }

  function closeAlert() {
    handleCloseAlert(false);
  }

  //dummy function for now, the idea is to get the value of the selected row/bond and later use it for Watchlist/other
  function handleAddRow(rowData) {
    //setSelectedRows((prevRows) => [...prevRows, rowData]);
    console.log(rowData);
    setChosenBond(rowData);
    setIsBondAdded(true);
  }

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .super-app-theme--Alerted": {
      backgroundColor: "#FBEDEC",
      width: "100%",
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndPoint + "bond/all/withPred");
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API.");
        }
        const data = await response.json();
        console.log(data);

        const objectsCurrentPortfolio = listPortfolio[listBondID].map(
          (bondID) => {
            const foundBond = data.find((bond) => bond.BondID === bondID);

            if (foundBond) {
              return {
                ...foundBond,
              };
            }

            // Handle the case where a bond with the given ID is not found
            return null;
          }
        );

        // return {
        //   [key]: objects.filter((object) => object !== null),
        // };

        // const formattedData = newArray.reduce((acc, curr) => {
        //   const [key, value] = Object.entries(curr)[0];
        //   acc[key] = value;
        //   return acc;
        // }, {});

        console.log(objectsCurrentPortfolio);
        setDisplayedBond(objectsCurrentPortfolio);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [listBondID]);

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
  ];

  return (
    <Card sx={{ width: "100%" }}>
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
        title="Bonds in Alert, based on Your Portfolios"
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
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <Typography>Show Bonds in alert from </Typography>
              <TextField
                select
                size="small"
                variant="standard"
                defaultValue="A"
              >
                {["A", "B"].map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={() => setListBondID(option)}
                  >
                    Portfolio {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <StyledDataGrid
              rows={displayedBond}
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
                    IssuerRating: false,
                    IssueDate: false,
                    MaturityDate: false,
                    Bid: false,
                    Ask: false,
                    FaceOutstanding: false,
                    CouponRate: false,
                  },
                },
              }}
              pageSizeOptions={[10, 25, 50, 100]}
              headerClassName="column-header"
              headerCellClassName="column-header"
            />

            <Button variant="contained" onClick={closeAlert}>
              Close
            </Button>
          </Stack>
        </Box>
      </CardContent>

      <Dialog
        open={openAlertModal}
        close={() => setOpenAlertModal(false)}
        maxWidth="lg"
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
