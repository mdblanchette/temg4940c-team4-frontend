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

import { useState } from "react";
import { CloseOutlined, Search } from "@mui/icons-material";

import BondInfoColumn from "./BondInfoColumn";
import BondPredictionCard from "./BondPredictionCard";
import AdvancedSetting from "./AdvancedSearchSetting";
import BondInfoTable from "./BondInfoTable";
import BondTrendCard from "./BondTrend";
import dayjs from "dayjs";

export default function MultiResultCard() {
  const [openSetting, setOpenSetting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    Issuer: ["All"],
    Rating: ["All"],
    Country: ["All"],
    Outstanding: [0, 10],
    IssueDate: dayjs(),
    MatureDate: dayjs(),
    Maturity: 30,
    CouponRate: [0, 100],
  });
  const [predictionData, setPredictionData] = useState({
    ratingMigration: 20.1,
    targetRating: "",
    spreadChange: 100,
    priceCorrelation: 15.7,
  });

  function handleSearch(newSearchFilter) {
    setSearchFilter(newSearchFilter);
    console.log("updated filter: ", searchFilter);
  }

  function handlePrediction(newPredictedData) {
    setPredictionData(newPredictedData);
  }

  function handleSearchInput(event) {
    setSearchTerm(event.target.value);
  }

  function handleCloseSetting(state) {
    setOpenSetting(state);
  }

  return (
    <Card>
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

          <BondInfoTable
            searchFilter={searchFilter}
            handlePredictionInfo={handlePrediction}
          />
          <BondPredictionCard predictionData={predictionData} />
          <BondTrendCard />
        </Stack>
      </CardContent>
    </Card>
  );
}
