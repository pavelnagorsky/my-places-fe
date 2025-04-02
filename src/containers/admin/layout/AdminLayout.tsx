import { PropsWithChildren } from "react";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Paper, PaperProps } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AdminSideBar from "@/containers/admin/layout/AdminSideBar";

const AdminLayout = ({
  children,
  paperProps,
}: PropsWithChildren & { paperProps?: PaperProps }) => {
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
          <Grid size={{ xs: 12, xl: 2 }} sx={{ zIndex: 10 }}>
            <AdminSideBar />
          </Grid>
          <Grid size={{ xs: 12, xl: 10 }}>
            <Paper {...paperProps}>{children}</Paper>
          </Grid>
        </Grid>
      </WrappedContainer>
    </ProtectedAuth>
  );
};

export default AdminLayout;
