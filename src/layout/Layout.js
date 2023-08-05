import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <Sidebar children={children} />
    </>
  );
};
