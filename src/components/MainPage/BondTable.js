import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const bonds = [
  {
    id: 1,
    name: "Apple",
    issuer: "Apple Inc.",
    rating: "A",
    migration: 20.1,
    spread: -600,
    confidence: 78.9,
    coupon: 2.5,
    maturity_date: "2021-10-01",
    bid: 99.5,
    ask: 100.5,
  },
  {
    id: 2,
    name: "Microsoft",
    issuer: "Microsoft Inc.",
    rating: "A",
    migration: 20.1,
    spread: -600,
    confidence: 78.9,
    coupon: 2.5,
    maturity_date: "2021-10-01",
    bid: 99.5,
    ask: 100.5,
  },
  {
    id: 1,
    name: "Apple",
    issuer: "Apple Inc.",
    rating: "A",
    migration: 20.1,
    spread: -600,
    confidence: 78.9,
    coupon: 2.5,
    maturity_date: "2021-10-01",
    bid: 99.5,
    ask: 100.5,
  },
  {
    id: 2,
    name: "Microsoft",
    issuer: "Microsoft Inc.",
    rating: "A",
    migration: 20.1,
    spread: -600,
    confidence: 78.9,
    coupon: 2.5,
    maturity_date: "2021-10-01",
    bid: 99.5,
    ask: 100.5,
  },
  {
    id: 1,
    name: "Apple",
    issuer: "Apple Inc.",
    rating: "A",
    migration: 20.1,
    spread: -600,
    confidence: 78.9,
    coupon: 2.5,
    maturity_date: "2021-10-01",
    bid: 99.5,
    ask: 100.5,
  },
  {
    id: 2,
    name: "Microsoft",
    issuer: "Microsoft Inc.",
    rating: "A",
    migration: 20.1,
    spread: -600,
    confidence: 78.9,
    coupon: 2.5,
    maturity_date: "2021-10-01",
    bid: 99.5,
    ask: 100.5,
  },
];

export default function BondTable() {
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Issuer</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Migration</TableCell>
              <TableCell>Spread</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Coupon</TableCell>
              <TableCell>Maturity Date</TableCell>
              <TableCell>Bid</TableCell>
              <TableCell>Ask</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonds.map((bond) => {
              return (
                <TableRow hover key={bond.id}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">{bond.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{bond.issuer}</TableCell>
                  <TableCell>{bond.rating}</TableCell>
                  <TableCell>{bond.migration}</TableCell>
                  <TableCell>{bond.spread}</TableCell>
                  <TableCell>{bond.confidence}</TableCell>
                  <TableCell>{bond.coupon}</TableCell>
                  <TableCell>{bond.maturity_date}</TableCell>
                  <TableCell>{bond.bid}</TableCell>
                  <TableCell>{bond.ask}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
