import { PropsWithChildren } from "react";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Grid from "@mui/material/Grid2";
import PersonalAreaSideBar from "@/containers/personal-area/layout/PersonalAreaSideBar";

const PersonalAreaLayout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedAuth mode={"redirectPermanent"}>
      <WrappedContainer wrapperSx={{ px: { xs: "1.5em", md: "3em" } }}>
        <Grid
          container
          columnSpacing={"2em"}
          mt={"1em"}
          mb={"3em"}
          position={"relative"}
        >
          <Grid
            size={{ xs: 12, xl: 2 }}
            sx={{ zIndex: 10, mt: { md: "0.5em" } }}
          >
            <PersonalAreaSideBar />
          </Grid>
          <Grid size={{ xs: 12, xl: 10 }}>{children}</Grid>
        </Grid>
      </WrappedContainer>
    </ProtectedAuth>
  );
};

export default PersonalAreaLayout;
