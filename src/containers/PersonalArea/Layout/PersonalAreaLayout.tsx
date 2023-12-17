import { PropsWithChildren } from "react";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import WrappedContainer from "@/hoc/Wrappers/WrappedContainer";
import { Grid } from "@mui/material";
import PersonalAreaSideBar from "@/containers/PersonalArea/Layout/PersonalAreaSideBar";

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
            sx={{ zIndex: 10, mt: { md: "0.5em" } }}
          >
            <PersonalAreaSideBar />
          </Grid>
          <Grid item xs={12} md={9} lg={9.5}>
            {children}
          </Grid>
        </Grid>
      </WrappedContainer>
    </ProtectedAuth>
  );
};

export default PersonalAreaLayout;
