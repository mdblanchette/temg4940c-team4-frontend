import React, { useState } from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerContainer = styled('div')({
  width: 300,
  flexShrink: 0,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export default function WatchlistSideBar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleDrawerOpen}>
        <ChevronRightIcon />
      </IconButton>
      <DrawerContainer>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          PaperProps={{
            sx: {
              width: 300,
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          {/* Add your sidebar content here */}
        </Drawer>
      </DrawerContainer>
    </div>
  );
};

