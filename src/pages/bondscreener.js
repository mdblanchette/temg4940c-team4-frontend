import createTheme from "../theme";
import { Layout as DashboardLayout } from "../layout/Layout";
import MultiResultCard from "../components/BondScreener/MultiResultCard";
import { Box, Container, Grid } from "@mui/material";

const Page = () => {
  const theme = createTheme();

  return (
    // <Box
    //   component="main"
    //   sx={{
    //     flexGrow: 1,
    //     py: 2,
    //   }}
    // >
    // <DashboardLayout>

    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item sm={12} sx={{ flexGrow: 1 }}>
        <MultiResultCard />
      </Grid>
    </Grid>

    // </DashboardLayout>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
