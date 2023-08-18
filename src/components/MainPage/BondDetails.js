import { AddCircleOutlined, CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

export default function BondDetails({
  openBondDetails,
  handleCloseBondDetails,
  bondInfo,
}) {
  return (
    <Dialog open={openBondDetails} onClose={handleCloseBondDetails} fullWidth>
      <Card
        sx={{
          py: 2,
          px: 2,
          color: "white",
          backgroundColor: "#6466f1",
          borderRadius: 0,
        }}
      >
        <Card sx={{ py: 0 }}>
          <CardHeader
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 2,
            }}
            action={
              <Box>
                <Button variant="outlined">View Company</Button>
                <IconButton>
                  <AddCircleOutlined sx={{ color: "#007AF5" }} />
                </IconButton>
                <IconButton onClick={handleCloseBondDetails}>
                  <CloseOutlined />
                </IconButton>
              </Box>
            }
            title={bondInfo.rank + ". " + bondInfo.ISIN}
          />
        </Card>
        <Card sx={{ my: 2 }}>
          <CardHeader title="Bond Details" />
          <CardContent>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography variant="h6" align="center">
                  Bond Description
                </Typography>
                <Typography align="center">{bondInfo.description}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" align="center">
                  Coupon
                </Typography>
                <Typography align="center">{bondInfo.coupon}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" align="center">
                  Maturity Date
                </Typography>
                <Typography align="center">{bondInfo.maturity}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" align="center">
                  Price
                </Typography>
                <Typography align="center">{bondInfo.price}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" align="center">
                  Benchmark Spread
                </Typography>
                <Typography align="center">
                  {bondInfo.benchmarkSpread}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" align="center">
                  Benchmark Bond
                </Typography>
                <Typography align="center">{bondInfo.benchmarkBond}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" align="center">
                  Z-Spread
                </Typography>
                <Typography align="center">{bondInfo.zspread}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Credit Information" />
          <CardContent>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  Credit Rating (Moody's)
                </Typography>
                <Typography align="center">{bondInfo.rating}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  Predicted Spread Movement
                </Typography>
                <Typography align="center">
                  {bondInfo.migration + " bps"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  Confidence
                </Typography>
                <Typography align="center">
                  {bondInfo.ratingConfidence * 100 + "%"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  Confidence
                </Typography>
                <Typography align="center">
                  {bondInfo.migrationConfidence * 100 + "%"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Card>
    </Dialog>
  );
}
