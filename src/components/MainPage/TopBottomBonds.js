import { Card, CardContent, CardHeader, Grid } from "@mui/material";

export default function TopBottomBonds() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader sx={{ paddingBottom: 0 }} title="Today's Bond Predictions" />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            Top 5 Performing Bonds
          </Grid>
          <Grid item xs={6}>
            Worst 5 Performing Bonds
          </Grid>
          <Grid item xs={6}>
            Bond A
          </Grid>
          <Grid item xs={6}>
            Bond B
          </Grid>
          <Grid item xs={6}>
            Bond C
          </Grid>
          <Grid item xs={6}>
            Bond D
          </Grid>
          <Grid item xs={6}>
            Bond E
          </Grid>
          <Grid item xs={6}>
            Bond F
          </Grid>
          <Grid item xs={6}>
            Bond G
          </Grid>
          <Grid item xs={6}>
            Bond H
          </Grid>
          <Grid item xs={6}>
            Bond I
          </Grid>
          <Grid item xs={6}>
            Bond J
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
