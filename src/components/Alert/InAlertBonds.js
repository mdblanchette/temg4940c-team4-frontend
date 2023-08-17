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
  const apiEndPoint = "http://localhost:3500/";
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
    A: ["44658909176", "15628972515"],
    B: ["46633294394", "44658909176"],
    C: ["15628972515"],
  });
  const [listBondID, setListBondID] = useState(listPortfolio.A);

  useEffect(() => {
    const storedPortfolio = localStorage.getItem(keyPortfolioList);
    if (storedPortfolio) {
      setListPortfolio(JSON.parse(storedPortfolio));
    } else {
      setListPortfolio(listPortfolio);
    }
  }, []);

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
        //const response = await fetch(apiEndPoint + "bond");
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data from the API.");
        // }
        // const data = await response.json();

        const defaultRetrievedID = listBondID;

        const requests = defaultRetrievedID.map((url) =>
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
                {["A", "B", "C"].map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={() => setListBondID(listPortfolio[option])}
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
                    IssueDate: false,
                    //Maturity: false,
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
