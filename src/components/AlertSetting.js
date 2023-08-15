import { CloseOutlined } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CardContent,
  Select,
  Typography,
  MenuItem,
  Stack,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";

import { useState, useEffect } from "react";
import { AddColumn, SliderColumn } from "./BondScreener/AdvancedSearchSetting";

export default function AlertSetting({
  indicator,
  handleIndicator,
  handleCloseSetting,
}) {
  const [chosenIndicator, setChosenIndicator] = useState(
    "Based on Predicted Rating Migration"
  );
  const [chosenValueSpread, setChosenValueSpread] = useState([0, 1000]);
  const [chosenRatingTarget, setChosenRatingTarget] = useState([
    "Aaa",
    "Aa1",
    "Aa2",
  ]);
  const [chosenAlertDirection, setChosenAlertDirection] = useState([]);
  const [migrationProbability, setMigrationProbability] = useState([0, 100]);

  const creditRatings = [
    "All",
    "Aaa",
    "Aa1",
    "Aa2",
    "Aa3",
    "A1",
    "A2",
    "A3",
    "Baa1",
    "Baa2",
    "Baa3",
    "Ba1",
    "Ba2",
    "Ba3",
    "B1",
    "B2",
    "B3",
    "Caa1",
    "Caa2",
    "Caa3",
    "Ca",
    "C",
  ];

  const handleAlertDirection = (item, isChecked) => {
    setChosenAlertDirection((prevItems) => {
      if (isChecked) {
        // Item is checked, add it if it doesn't already exist
        if (!prevItems.includes(item)) {
          return [...prevItems, item];
        }
      } else {
        // Item is unchecked, remove it if it exists
        return prevItems.filter((prevItem) => prevItem !== item);
      }
      return prevItems;
    });
  };

  function updateAlertSetting() {
    handleIndicator({
      Indicator: chosenIndicator,
      valueSpread: chosenValueSpread,
      chosenRatingTarget: chosenRatingTarget,
      chosenAlertDirection: chosenAlertDirection,
      migrationProbability: migrationProbability,
    });
  }

  return (
    <CardContent>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography>Choose Indicators</Typography>
          <Select
            value={chosenIndicator}
            onChange={(event) => setChosenIndicator(event.target.value)}
          >
            <MenuItem value="Based on Predicted Rating Migration">
              Based on Predicted Rating Migration
            </MenuItem>
            <MenuItem value="Based on Predicted Change in Spread">
              Based on Predicted Change in Spread
            </MenuItem>
          </Select>
        </Stack>

        {chosenIndicator === "Based on Predicted Rating Migration" ? (
          <Stack spacing={2}>
            <AddColumn
              Title={"Choose Predicted Final Rating"}
              Options={creditRatings}
              inputValue={chosenRatingTarget}
              handleChange={(items) => setChosenRatingTarget(items)}
              //secondOptions={chosenAlertDirection}
              //handleSecondOptions={handleAlertDirection}
            />
            <SliderColumn
              Title="Predicted Migration Probability"
              inputValue={migrationProbability}
              handleChange={(event, newValue) =>
                setMigrationProbability(newValue)
              }
              unit="%"
            />
          </Stack>
        ) : (
          <SliderColumn
            Title="Set Spread Range"
            unit=" bp"
            inputValue={chosenValueSpread}
            handleChange={(event, newValue) => setChosenValueSpread(newValue)}
            inputOptions={chosenAlertDirection}
            handleOptions={handleAlertDirection}
          />
        )}

        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            sx={{ minWidth: 100 }}
            variant="contained"
            onClick={() => handleCloseSetting(false)}
          >
            Update
          </Button>
          <Button
            sx={{ minWidth: 100, color: "primary" }}
            variant="outlined"
            onClick={() => {
              updateAlertSetting();
              handleCloseSetting(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </CardContent>
  );
}
