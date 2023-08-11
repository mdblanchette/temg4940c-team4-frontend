import { Autocomplete, TextField } from "@mui/material";

const indicators = [
  "GDP Growth Rate",
  "Interest Rate",
  "Inflation Rate",
  "Unemployment Rate",
  "Government Debt to GDP",
  "Government Spending",
  "Balance of Trade",
  "Current Account to GDP",
  "Credit Rating",
  "Corporate Tax Rate",
];

export default function IndicatorDropdown(props) {
  return (
    <Autocomplete
      options={indicators}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      sx={{ width: "100%", marginRight: "16px" }}
      defaultValue={props.defaultValue}
    />
  );
}
