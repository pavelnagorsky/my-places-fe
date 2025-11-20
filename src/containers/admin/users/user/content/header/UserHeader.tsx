import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { motion } from "framer-motion";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import RestoreIcon from "@mui/icons-material/Restore";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import usePopover from "@/hooks/usePopover";
import { Fragment } from "react";
import {
  FormProvider,
  TextFieldElement,
  UseFormReturn,
} from "react-hook-form-mui";
// @ts-ignore
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { IBlockUserForm } from "@/containers/admin/users/user/logic/interfaces";
import { CustomLabel } from "@/components/forms/custom-form-elements/CustomLabel";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { selectUserId } from "@/store/user-slice/user.slice";
import RolesEnum from "@/services/auth-service/enums/roles.enum";
import EmailSection from "@/containers/admin/users/user/content/header/content/EmailSection";
import { StyledButton } from "@/components/UI/button/StyledButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopup from "@/components/confirm-popup/ConfirmPopup";
import useUserDeletion from "@/containers/admin/users/user/logic/useUserDeletion";

interface IUserHeaderProps {
  user: IUserShortInfo;
  loading: boolean;
  handleBlock: (callback: () => void) => void;
  handleUnblock: () => void;
  formContext: UseFormReturn<IBlockUserForm>;
}

const UserHeader = ({
  user,
  loading,
  handleBlock,
  handleUnblock,
  formContext,
}: IUserHeaderProps) => {
  const router = useRouter();
  const query = router.query as { id: string };
  const myUserId = useAppSelector(selectUserId);
  const canBlock =
    +query.id !== myUserId &&
    !((user?.roles || []).findIndex((r) => r.name === RolesEnum.ADMIN) > -1);
  const canDelete = canBlock;
  const { handleDeleteUser, deleteLoading } = useUserDeletion();

  const confirmDeletePopup = usePopover("confirm-delete");
  const blockPopover = usePopover("block-form");
  const onClosePopover = () => {
    blockPopover.handleClose();
    formContext.reset();
  };

  return (
    <Stack
      gap={"1em"}
      direction={{ sm: "row" }}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={primaryBackground}
      px={{ xs: "1em", lg: "2em" }}
      py={"1em"}
    >
      <Stack alignItems={{ xs: "center", sm: "start" }} width={"100%"}>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            fontWeight={500}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "0.5em",
              textDecoration: "none",
            }}
            component={Link}
            role="button"
            href={"/administration/users"}
            color="inherit"
          >
            <KeyboardBackspaceIcon />
            <Box component={"span"} mx={"0.2em"}>
              Пользователи
            </Box>
          </Typography>
        </motion.div>

        <Stack
          direction={"row"}
          alignItems={"center"}
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.3 } }}
        >
          <Box display={{ xs: "none", sm: "block" }}>
            <PersonIcon fontSize={"large"} />
          </Box>
          <Stack
            component={motion.div}
            alignItems={{ xs: "center", sm: "start" }}
            mx={{ xs: "0.5em", sm: "1em" }}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              fontSize={{ xs: "20px", md: "25px" }}
              fontWeight={600}
            >
              {user?.firstName || ""} {user?.lastName || ""}
            </Typography>
            <Typography variant="caption" fontSize={"12px"} fontWeight={500}>
              Информация о пользователе
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        gap={"1em"}
        direction={{ md: "row" }}
        alignItems={"center"}
        width={"100%"}
        justifyContent={"end"}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          {user && (
            <EmailSection
              user={user}
              sx={{
                fontWeight: 600,
                py: "0.6em",
              }}
            />
          )}
        </Box>
        <Box
          component={motion.div}
          sx={{ display: "flex", gap: "1em" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          {user?.blockedUntil ? (
            <StyledButton
              sx={{
                fontWeight: 600,
                py: "0.6em",
              }}
              variant="outlined"
              color="success"
              onClick={handleUnblock}
              startIcon={
                loading ? (
                  <CircularProgress color={"inherit"} size={20} />
                ) : (
                  <RestoreIcon />
                )
              }
            >
              Разблокировать
            </StyledButton>
          ) : (
            <Fragment>
              <StyledButton
                sx={{
                  fontWeight: 600,
                  py: "0.6em",
                }}
                variant="outlined"
                color="error"
                disabled={!canBlock}
                onClick={canBlock ? blockPopover.handleOpen : () => {}}
                startIcon={
                  loading ? (
                    <CircularProgress color={"inherit"} size={20} />
                  ) : (
                    <BlockIcon />
                  )
                }
              >
                Заблокировать
              </StyledButton>
              <Popover
                open={blockPopover.open}
                id={blockPopover.id}
                anchorEl={blockPopover.anchor}
                onClose={onClosePopover}
                PaperProps={{
                  sx: {
                    p: "1em",
                    borderRadius: "15px",
                  },
                }}
              >
                <FormProvider {...formContext}>
                  <Typography
                    fontSize={"18px"}
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    Блокировка пользователя
                  </Typography>
                  <Divider sx={{ borderColor: "divider", my: "0.5em" }} />
                  <Stack mb={"1.5em"} gap={"1em"}>
                    <Box>
                      <CustomLabel htmlFor={"reason"}>Причина</CustomLabel>
                      <TextFieldElement
                        multiline
                        minRows={2}
                        fullWidth
                        id={"reason"}
                        name={"reason"}
                        required
                        parseError={() => "Это поле обязательно к заполнению"}
                      />
                    </Box>
                    <Box>
                      <CustomLabel htmlFor={"blockEndDate"}>
                        Дата окончания
                      </CustomLabel>
                      <DatePickerElement
                        minDate={new Date()}
                        name={"blockEndDate"}
                        required
                        parseError={() => "Это поле обязательно к заполнению"}
                      />
                    </Box>
                  </Stack>
                  <Stack direction={"row"} justifyContent={"center"} mt={1}>
                    <Button
                      variant={"contained"}
                      color={"error"}
                      sx={{ textTransform: "none", fontSize: 16 }}
                      onClick={() => {
                        handleBlock(blockPopover.handleClose);
                      }}
                    >
                      Заблокировать
                    </Button>
                  </Stack>
                </FormProvider>
              </Popover>
            </Fragment>
          )}
        </Box>
        {canDelete && (
          <StyledButton
            sx={{
              fontWeight: 600,
              py: "0.6em",
            }}
            variant="contained"
            color="error"
            onClick={confirmDeletePopup.handleOpen}
            loading={deleteLoading}
            startIcon={<DeleteIcon />}
          >
            Удалить
          </StyledButton>
        )}
        <ConfirmPopup
          popoverProps={confirmDeletePopup}
          actionText={"Удалить"}
          title={`Вы уверены, что хотите удалить пользователя ${user?.firstName}?`}
          onSubmit={() => handleDeleteUser(user.id)}
        />
      </Stack>
    </Stack>
  );
};

export default UserHeader;
