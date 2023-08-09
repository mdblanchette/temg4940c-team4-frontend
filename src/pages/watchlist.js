import React from 'react';
import { Grid } from '@mui/material';
import { Layout as DashboardLayout } from "../layout/Layout";
import PortfolioAllocationCard from '../components/WatchList/PortfolioAllocationCard';
import PortfolioPerformanceCard from '../components/WatchList/PortfolioPerformanceCard';

const Page = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PortfolioAllocationCard />
      </Grid>
      <Grid item xs={12}>
        <PortfolioPerformanceCard />
      </Grid>
    </Grid>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
