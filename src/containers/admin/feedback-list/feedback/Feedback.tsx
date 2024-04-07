import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import useFeedback from "@/containers/admin/feedback-list/feedback/useFeedback";
import FeedbackHeader from "@/containers/admin/feedback-list/feedback/FeedbackHeader";
import BasicInfo from "./sections/BasicInfo";
import EmailSection from "@/containers/admin/feedback-list/feedback/sections/EmailSection";

const Feedback = () => {
  const { feedback } = useFeedback();

  const loader = !feedback ? (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"0.5em"}
      height={"50vh"}
    >
      <CircularProgress size={30} />
      <Typography fontSize={"18px"} color={"secondary.main"} fontWeight={600}>
        Загрузка...
      </Typography>
    </Stack>
  ) : null;

  return (
    <AdminLayout>
      <FeedbackHeader feedback={feedback} />
      {loader}
      <Grid container spacing={"2em"} p={"1em"}>
        <Grid item xs={12} md={6}>
          {feedback && <BasicInfo feedback={feedback} />}
        </Grid>
        <Grid item xs={12} md={6}>
          {feedback && <EmailSection feedback={feedback} />}
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Feedback;
