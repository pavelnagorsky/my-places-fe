import { PropsWithChildren } from "react";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Grid } from "@mui/material";
import PersonalAreaSideBar from "@/containers/personal-area/layout/PersonalAreaSideBar";

const PersonalAreaLayout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedAuth mode={"redirectPermanent"}>
      <WrappedContainer>
        <Grid
          container
          spacing={{ xs: "1em", md: "2em" }}
          mt={"1em"}
          mb={"3em"}
          position={"relative"}
        >
          <Grid
            item
            xs={12}
            md={3}
            lg={2.5}
            xl={2}
            sx={{ zIndex: 10, mt: { md: "0.5em" } }}
          >
            <PersonalAreaSideBar />
          </Grid>
          <Grid item xs={12} md={9} lg={9.5} xl={10}>
            {children}
          </Grid>
        </Grid>
      </WrappedContainer>
    </ProtectedAuth>
  );
};

export default PersonalAreaLayout;
