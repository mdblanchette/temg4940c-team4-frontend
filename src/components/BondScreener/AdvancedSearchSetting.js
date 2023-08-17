import {
  Typography,
  Box,
  Stack,
  Button,
  Checkbox,
  Autocomplete,
  TextField,
  Slider,
  Input,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";

//const keySearchSetting = "searchSetting";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { countryInfo } from "./BondInfoTable";

import { useState } from "react";
import dayjs from "dayjs";

const blueBase = "#007AF5";

const ThemeSetting = createTheme({
  palette: {
    primary: {
      main: blueBase,
      light: alpha(blueBase, 0.5),
      dark: alpha(blueBase, 0.9),
      contrastText: getContrastRatio(blueBase, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

const AutocompleteChips = ({
  multiple,
  options,
  value,
  onSelectionChange,
  disableCloseOnSelect,
  renderOption,
  style,
  renderInput,
}) => {
  const [selectedItems, setSelectedItems] = useState(value || []);

  const handleCheckboxChange = (item, selected) => {
    let updatedSelection;
    if (selected) {
      updatedSelection = [...selectedItems, item];
    } else {
      updatedSelection = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    }

    setSelectedItems(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={selectedItems}
      onChange={(event, newValue) => {
        setSelectedItems(newValue);
        onSelectionChange(newValue);
      }}
      disableCloseOnSelect={disableCloseOnSelect}
      renderOption={(props, option, state) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={state.selected}
            onChange={(event) =>
              handleCheckboxChange(option, event.target.checked)
            }
          />
          {option}
        </li>
      )}
      style={style}
      renderInput={renderInput}
    />
  );
};

export function AddColumn({
  Title,
  Options,
  handleChange,
  inputValue,
  secondOptions,
  handleSecondOptions,
}) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Typography>{Title}</Typography>
      <AutocompleteChips
        multiple
        options={Options}
        value={inputValue}
        onSelectionChange={handleChange}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
              onChange={(event) =>
                handleCheckboxChange(option, event.target.checked)
              }
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
            size="small"
          />
        )}
      />
      {secondOptions && (
        <FormGroup row>
          {["Up", "Down", "Stable"].map((item) => (
            <FormControlLabel
              key={item} // Add a unique key prop for each item in the map
              control={
                <Checkbox
                  checked={secondOptions.includes(item)}
                  onChange={(event) =>
                    handleSecondOptions(item, event.target.checked)
                  }
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      )}
    </Stack>
  );
}

export function SliderColumn({
  Title,
  inputValue,
  unit,
  inputOptions,
  handleChange,
  handleOptions,
}) {
  return (
    <ThemeProvider theme={ThemeSetting}>
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Typography>{Title}</Typography>
        <Slider
          value={inputValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          color="primary"
        />

        <Stack spacing="auto" direction="row">
          <Typography variant="body2">
            {inputValue[0]}
            {" - "}
            {inputValue[1]}
            {unit}
          </Typography>

          {inputOptions && (
            <FormGroup row>
              {["Up", "Down", "Stable"].map((item) => (
                <FormControlLabel
                  key={item} // Add a unique key prop for each item in the map
                  control={
                    <Checkbox
                      checked={inputOptions.includes(item)}
                      onChange={(event) =>
                        handleOptions(item, event.target.checked)
                      }
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>
          )}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default function AdvancedSetting({
  searchFilter,
  handleUpdate,
  handleClose,
}) {
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

  const countryNames = countryInfo.map((country) => country.name);

  const bondIssuers = [
    "All",
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

  // state of variables shown on the Advanced Search card
  const [rateMigration, setRateMigration] = useState([0, 100]);
  const [changeSpread, setChangeSpread] = useState([0, 1000]);
  const [liquidity, setLiquidity] = useState([0, 10]);
  const [issueDate, setIssueDate] = useState(dayjs("1990-01-01").format());
  const [matureDate, setMatureDate] = useState(dayjs("2050-01-01").format());
  const [maturity, setMaturity] = useState(30);
  const [creditRate, setCreditRate] = useState(["All"]);
  const [country, setCountry] = useState(["All"]);
  const [issuer, setIssuer] = useState(["All"]);
  const [ratingDirection, setRatingDirection] = useState([]);
  const [spreadDirection, setSpreadDirection] = useState([]);
  const [finalRating, setFinalRating] = useState(["All"]);
  const [couponRate, setCouponRate] = useState([0, 100]);

  function handleRateMigrationChange(event, newValue) {
    setRateMigration(newValue);
  }

  function handleCouponRate(event, newValue) {
    setCouponRate(newValue);
  }

  function handleChangeSpread(event, newValue) {
    setChangeSpread(newValue);
  }

  function handleChangeLiquidity(event, newValue) {
    setLiquidity(newValue);
  }

  const handleMigrationDirectionChange = (item, isChecked) => {
    setRatingDirection((prevItems) => {
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

  const handleSpreadDirectionChange = (item, isChecked) => {
    setSpreadDirection((prevItems) => {
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

  function handleInputChange() {
    const updatedFilter = {
      Issuer: issuer,
      Rating: creditRate,
      Country: country,
      Outstanding: liquidity,
      IssueDate: issueDate,
      MatureDate: matureDate,
      FinalRating: finalRating,
      MigrationProbability: rateMigration,
      CouponRate: couponRate,
      SpreadChange: changeSpread,
      ChangeDirection: spreadDirection,
    };

    handleUpdate(updatedFilter);
    //localStorage.setItem(keySearchSetting, JSON.stringify(updatedFilter))
  }

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={ThemeSetting} />
        <Stack spacing={1}>
          <Stack spacing={8} direction="row">
            <AddColumn
              Title="Credit Rating"
              Options={creditRatings}
              inputValue={creditRate}
              handleChange={(items) => setCreditRate(items)}
            />
            <AddColumn
              Title="Country"
              Options={countryNames}
              inputValue={country}
              handleChange={(items) => setCountry(items)}
            />
          </Stack>

          <Stack spacing={8} direction="row">
            <AddColumn
              Title="Issuer"
              Options={bondIssuers}
              inputValue={issuer}
              handleChange={(items) => setIssuer(items)}
            />
            <SliderColumn
              Title="Outstanding"
              inputValue={liquidity}
              handleChange={handleChangeLiquidity}
              unit="B"
            />
          </Stack>

          <Stack spacing={8} direction="row">
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Typography>Earliest Issue Date</Typography>
              <DatePicker
                label="Select date"
                maxDate={dayjs(matureDate)}
                value={dayjs(issueDate)}
                onChange={(date) => setIssueDate(dayjs(date).format())}
                renderInput={(props) => <TextField {...props} size="small" />}
              />
            </Stack>

            <Stack spacing={2} sx={{ width: "100%" }}>
              <Typography>Latest Mature Date</Typography>
              <DatePicker
                label="Select date"
                minDate={dayjs(issueDate)}
                value={dayjs(matureDate)}
                onChange={(date) => setMatureDate(dayjs(date).format())}
                renderInput={(props) => <TextField {...props} size="small" />}
              />
            </Stack>
          </Stack>

          {/* <Stack spacing={1}>
            <Stack spacing={1} direction="row">
              <Typography>Maturity (years): </Typography>
              <Input inputProps={{ type: "number", step: 1, min: 0 }} />
            </Stack>
          </Stack> */}

          <Stack spacing={8} direction="row">
            <SliderColumn
              Title="Coupon Rate"
              inputValue={couponRate}
              handleChange={handleCouponRate}
              unit="%"
            />
            <SliderColumn
              Title="Predicted Migration Probability"
              inputValue={rateMigration}
              handleChange={handleRateMigrationChange}
              unit="%"
            />
          </Stack>

          <Stack spacing={8} direction="row">
            <AddColumn
              Title="Predicted Final Rating"
              Options={creditRatings}
              inputValue={finalRating}
              handleChange={(items) => setFinalRating(items)}
              secondOptions={ratingDirection}
              handleSecondOptions={handleMigrationDirectionChange}
            />

            <SliderColumn
              Title="Predicted Change in Spread"
              inputValue={changeSpread}
              handleChange={handleChangeSpread}
              unit=" bp"
              inputOptions={spreadDirection}
              handleOptions={handleSpreadDirectionChange}
            />
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            paddingBottom={2}
          >
            <Button
              sx={{ minWidth: 100 }}
              variant="contained"
              onClick={() => {
                handleInputChange();
                handleClose(false);
              }}
            >
              Search
            </Button>
            <Button sx={{ minWidth: 100, color: "primary" }} variant="outlined">
              Clear
            </Button>
          </Stack>
        </Stack>
        <ThemeProvider theme={ThemeSetting} />
      </LocalizationProvider>
    </Box>
  );
}
