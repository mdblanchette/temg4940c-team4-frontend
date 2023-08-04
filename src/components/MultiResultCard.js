import {
  Card,
  CardContent,
  Button,
  Stack,
  Dialog,
  DialogContent,
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
import BondTrendCard from "./BondTrend";
import AdvancedSetting from "./AdvancedSearchSetting";

export default function MultiResultCard() {
  const [openSetting, setOpenSetting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchInput(event) {
    setSearchTerm(event.target.value);
  }
  function handleCloseSetting() {
    setOpenSetting(false);
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
              close={handleCloseSetting}
              fullWidth
              maxWidth="lg"
            >
              {/* <DialogContent style={{ width: "80vw" }}> */}
              <Card>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      spacing="auto"
                      sx={{ alignItems: "center" }}
                    >
                      <Typography variant="body1">Advanced Search</Typography>
                      <IconButton onClick={handleCloseSetting}>
                        <CloseOutlined />
                      </IconButton>
                    </Stack>

                    <AdvancedSetting />
                  </Stack>
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

          <BondInfoColumn />
          <BondPredictionCard />
          <BondTrendCard />
        </Stack>
      </CardContent>
    </Card>
  );
}
