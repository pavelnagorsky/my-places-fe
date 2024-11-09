import useUser from "@/containers/admin/users/user/useUser";
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import BasicInfo from "@/containers/admin/users/user/sections/BasicInfo";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import ModeratorForm from "@/containers/admin/users/user/sections/ModeratorForm";
import { FormProvider } from "react-hook-form-mui";
import UserHeader from "@/containers/admin/users/user/UserHeader";

const User = () => {
  const logic = useUser();

  const loader = (
    <Backdrop sx={{ zIndex: 1000 }} open={!logic.user}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.5em"}
        height={"400px"}
      >
        <CircularProgress size={30} />
        <Typography fontSize={"18px"} color={"secondary.main"} fontWeight={600}>
          Загрузка...
        </Typography>
      </Stack>
    </Backdrop>
  );

  return (
    <AdminLayout>
      <UserHeader
        formContext={logic.blockForm}
        user={logic.user}
        loading={logic.blockLoading}
        handleBlock={logic.handleBlockUser}
        handleUnblock={logic.handleUnblockUser}
      />
      {loader}
      <Grid container spacing={"2em"} p={"1em"}>
        <Grid size={{ xs: 12, md: 6 }}>
          {logic.user && <BasicInfo user={logic.user} />}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormProvider {...logic.moderatorForm}>
            <ModeratorForm
              isModerator={!!logic.moderator}
              loading={logic.moderatorLoading}
              deleteLoading={logic.moderatorDeleteLoading}
              onDelete={logic.handleRemoveModerator}
              onSave={logic.handleSaveModerator}
              user={logic.user}
            />
          </FormProvider>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default User;
