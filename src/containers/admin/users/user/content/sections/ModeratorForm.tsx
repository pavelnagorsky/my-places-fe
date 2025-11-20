import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import useRolesOptions from "@/hooks/useRolesOptions";
import PhoneInput from "@/components/forms/PhoneInput";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { TextFieldElement } from "react-hook-form-mui";
import { Button } from "@/components/UI/button/Button";
import SettingsIcon from "@mui/icons-material/Settings";

interface IModeratorFormProps {
  isModerator: boolean;
  user: IUserShortInfo | null;
  onSave: () => void;
  onDelete: () => void;
  loading: boolean;
  deleteLoading: boolean;
}

const ModeratorForm = ({
  user,
  isModerator,
  deleteLoading,
  onDelete,
  loading,
  onSave,
}: IModeratorFormProps) => {
  const roles = useRolesOptions();
  return (
    <Paper
      sx={{
        p: "1em",
        borderRadius: "10px",
      }}
    >
      <Stack gap={"1em"}>
        <Stack>
          <Typography
            fontWeight={600}
            fontSize={{ xs: "22px", md: "25px" }}
            gutterBottom
          >
            Роли пользователя
          </Typography>
          <Typography
            fontWeight={500}
            alignItems={"center"}
            display={"flex"}
            gap={"0.5em"}
          >
            <SettingsIcon />
            {(user?.roles || [])
              .map(
                (r) => roles.find((opt) => opt.id === r.name)?.label || r.name
              )
              .join(", ")}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            fontWeight={600}
            fontSize={{ xs: "22px", md: "25px" }}
            gutterBottom
          >
            Данные модератора
          </Typography>
          <Stack gap={"1em"}>
            <Box>
              <CustomLabel htmlFor={"phone"}>Телефон</CustomLabel>
              <PhoneInput fillWidth id={"phone"} fieldName={"phone"} />
            </Box>
            <Box>
              <CustomLabel htmlFor={"address"}>Адрес</CustomLabel>
              <TextFieldElement
                id={"address"}
                name={"address"}
                required
                fullWidth
                parseError={(e) => "Это поле обязательно к заполнению"}
              />
            </Box>
            <Stack direction={"row"} mt={"1em"} flexWrap={"wrap"} gap={"1em"}>
              <Button
                onClick={onSave}
                startIcon={
                  loading ? (
                    <CircularProgress size={22} color={"inherit"} />
                  ) : null
                }
                sx={{
                  fontSize: "14px",
                  px: "1.5em",
                }}
                variant={"contained"}
              >
                {isModerator ? "Обновить данные" : "Сделать модератором"}
              </Button>
              {isModerator && (
                <Button
                  startIcon={
                    deleteLoading ? (
                      <CircularProgress size={22} color={"inherit"} />
                    ) : null
                  }
                  onClick={onDelete}
                  sx={{
                    fontSize: "14px",
                    px: "1.5em",
                  }}
                  variant={"contained"}
                  color={"error"}
                >
                  Удалить модератора
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ModeratorForm;
