import { PropsWithChildren } from "react";
import ProtectedAuth from "@/hoc/ProtectedAuth";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { Grid } from "@mui/material";
import ModerationSideBar from "@/containers/moderation/layout/ModerationSideBar";

const ModerationLayout = ({ children }: PropsWithChildren) => {
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
          <Grid item xs={12} xl={2} sx={{ zIndex: 10, mt: { md: "0.5em" } }}>
            <ModerationSideBar />
          </Grid>
          <Grid item xs={12} xl={10}>
            {children}
          </Grid>
        </Grid>
      </WrappedContainer>
    </ProtectedAuth>
  );
};

export default ModerationLayout;
