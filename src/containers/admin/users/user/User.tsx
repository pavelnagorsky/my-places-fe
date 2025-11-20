import useUser from "@/containers/admin/users/user/logic/useUser";
import Grid from "@mui/material/Grid2";
import BasicInfo from "@/containers/admin/users/user/content/sections/BasicInfo";
import AdminLayout from "@/containers/admin/layout/AdminLayout";
import ModeratorForm from "@/containers/admin/users/user/content/sections/ModeratorForm";
import { FormProvider } from "react-hook-form-mui";
import UserHeader from "@/containers/admin/users/user/content/header/UserHeader";
import BackdropLoader from "@/components/UI/loader/BackdropLoader";

const User = () => {
  const logic = useUser();

  if (!logic.user)
    return (
      <AdminLayout>
        <BackdropLoader loading />
      </AdminLayout>
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
      <Grid container spacing={"2em"} p={"1em"}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BasicInfo user={logic.user} />
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
