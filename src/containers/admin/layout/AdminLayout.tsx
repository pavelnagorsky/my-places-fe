import { PropsWithChildren } from "react";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Box, Grid, Paper } from "@mui/material";
import AdminSideBar from "@/containers/admin/layout/AdminSideBar";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedAuth mode={"redirectPermanent"}>
      <WrappedContainer wrapperSx={{ px: { xs: "1.5em", md: "3em" } }}>
        <Grid
          container
          columnSpacing={"2em"}
          mt={"1em"}
          mb={"5em"}
          position={"relative"}
        >
          <Grid item xs={12} xl={2} sx={{ zIndex: 10 }}>
            <AdminSideBar />
          </Grid>
          <Grid item xs={12} xl={10}>
            <Paper>{children}</Paper>
          </Grid>
        </Grid>
      </WrappedContainer>
    </ProtectedAuth>
  );
};

export default AdminLayout;
