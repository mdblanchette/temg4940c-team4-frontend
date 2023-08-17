import createTheme from "../theme";
import { Layout as DashboardLayout } from "../layout/Layout";
import MultiResultCard from "../components/BondScreener/MultiResultCard";
import { Box, Container } from "@mui/material";

const Page = () => {
  const theme = createTheme();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
      }}
    >
      <Container
        maxWidth="xxl"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MultiResultCard />
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
