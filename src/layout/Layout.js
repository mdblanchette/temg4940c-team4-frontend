import Sidebar from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <Sidebar children={children} />
    </>
  );
};
