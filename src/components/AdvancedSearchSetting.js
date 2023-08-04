import {
  Card,
  Typography,
  Box,
  Stack,
  Button,
  Chip,
  Checkbox,
  Autocomplete,
  TextField,
  Slider,
  Input,
  CardContent,
} from "@mui/material";

import { format, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";

import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

import { useState } from "react";

function AddColumn({ Title, Options, handleAdd, handleRemove }) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography variant="body1">{Title}</Typography>
      <Autocomplete
        multiple
        options={Options}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        style={{ minWidth: 180 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Type or choose here"
            variant="outlined"
            sx={{ backgroundColor: "#F1F8FF", border: 0 }}
          />
        )}
      />
    </Stack>
  );
}

function SliderColumn({
  Title,
  inputValue,
  unit,
  handleChange,
  handleOptions,
}) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography variant="body1">{Title}</Typography>
      <Slider
        value={inputValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        color="secondary"
      />
      <Typography variant="body2">
        {inputValue[0]}
        {" - "}
        {inputValue[1]}
        {unit}
      </Typography>
    </Stack>
  );
}

export default function AdvancedSetting() {
  const creditRatings = [
    "AAA",
    "AA+",
    "AA",
    "AA-",
    "A+",
    "A",
    "A-",
    "BBB+",
    "BBB",
    "BBB-",
    "BB+",
    "BB",
    "BB-",
    "B+",
    "B",
    "B-",
    "CCC+",
    "CCC",
    "CCC-",
    "CC",
    "C",
    "D",
  ];

  const oecdCountries = [
    "Australia",
    "Austria",
    "Belgium",
    "Canada",
    "Chile",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Korea",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Poland",
    "Portugal",
    "Slovak Republic",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "United Kingdom",
    "United States",
  ];

  const bondIssuers = [
    "JPMorgan Chase",
    "Bank of America",
    "Citigroup",
    "Wells Fargo",
    "Goldman Sachs",
    "Morgan Stanley",
    "HSBC Holdings",
    "Industrial and Commercial Bank of China",
    "China Construction Bank",
    "Bank of China",
    "Berkshire Hathaway",
    "BNP Paribas",
    "UBS Group",
    "Credit Suisse Group",
    "Barclays",
    "Royal Bank of Scotland",
    "Societe Generale",
    "Deutsche Bank",
    "Mitsubishi UFJ Financial Group",
    "Sumitomo Mitsui Financial Group",
  ];

  const [rateMigration, setRateMigration] = useState([0, 100]);
  const [changeSpread, setChangeSpread] = useState([10, 150]);
  const [liquidity, setLiquidity] = useState([2.4, 5]);
  // const [issueDate, setIssueDate] = useState(format(new Date(), "MM/dd/yyyy"));
  // const [matureDate, setMatureDate] = useState(
  //   format(new Date(), "MM/dd/yyyy")
  // );

  function handleRateMigrationChange(event, newValue) {
    setRateMigration(newValue);
  }

  function handleChangeSpread(event, newValue) {
    setChangeSpread(newValue);
  }

  function handleChangeLiquidity(event, newValue) {
    setLiquidity(newValue);
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Stack spacing={8} direction="row">
          <AddColumn Title="Credit Rating" Options={creditRatings} />
          <AddColumn Title="Country" Options={oecdCountries} />
        </Stack>

        <Stack spacing={8} direction="row">
          <AddColumn Title="Issuer" Options={bondIssuers} />
          <SliderColumn
            Title="Liquidity"
            inputValue={liquidity}
            handleChange={handleChangeLiquidity}
            unit="B"
          />
        </Stack>

        <Stack spacing={1}>
          {/* <Stack spacing={8} direction="row">
                <Stack spacing={1} sx={{ width: "100%" }}>
                  <Typography variant="body1">Issue Date</Typography>
                  <DayPicker
                    mode="single"
                    selected={parseISO(issueDate)}
                    onSelect={setIssueDate}
                  />
                  <Typography variant="body2">{issueDate}</Typography>
                </Stack>
                <Stack spacing={1} sx={{ width: "100%" }}>
                  <Typography variant="body1">Mature Date</Typography>
                  <DayPicker
                    fromDate={issueDate}
                    mode="single"
                    selected={parseISO(matureDate)}
                    onSelect={setMatureDate}
                  />
                  <Typography variant="body2">{matureDate}</Typography>
                </Stack>
              </Stack> */}

          <Stack spacing={1} direction="row">
            <Typography variant="body1">Maturity (years): </Typography>
            <Input inputProps={{ type: "number", step: 1, min: 0 }} />
          </Stack>
        </Stack>

        <Stack spacing={8} direction="row">
          <SliderColumn
            Title="Predicted Migration Rate"
            inputValue={rateMigration}
            handleChange={handleRateMigrationChange}
            unit="%"
          />
          <SliderColumn
            Title="Predicted Change in Spread"
            inputValue={changeSpread}
            handleChange={handleChangeSpread}
            unit="bp"
          />
        </Stack>

        <Stack spacing={2} direction="row" justifyContent="center">
          <Button sx={{ minWidth: 100 }} variant="contained">
            Search
          </Button>
          <Button sx={{ minWidth: 100 }} variant="outlined">
            Clear
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
