import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormProvider, TextFieldElement } from "react-hook-form-mui";
import SendIcon from "@mui/icons-material/Send";
import useComments from "@/containers/place/content/comments/logic/useComments";
import Comment from "@/containers/place/content/comments/content/Comment";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuth, selectUserId } from "@/store/user-slice/user.slice";
import { AnimatePresence, motion } from "framer-motion";
import useRoleAccess from "@/hooks/useRoleAccess";
import RolesEnum from "@/services/auth-service/enums/roles.enum";
import { useTranslation } from "next-i18next";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";

const Comments = ({
  entityId,
  entityType,
}: {
  entityId: number;
  entityType: StatisticEntitiesEnum;
}) => {
  const { t } = useTranslation("common");
  const commentsData = useComments({ entityId, entityType });
  const dateFnsLocale = useDateFnsLocale();
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();
  const hasModerationAccess = useRoleAccess([
    RolesEnum.ADMIN,
    RolesEnum.MODERATOR,
  ]);

  const onAuth = () => {
    dispatch(openAuth({}));
  };

  const sendButton = userId ? (
    <IconButton
      disabled={!commentsData.canSendComment}
      type={"submit"}
      color={"primary"}
      onClick={commentsData.onAddComment}
      sx={({ transitions }) => ({
        "&:hover": { transform: "scale(1.15)" },
        transition: transitions.create(["color", "transform"], {
          duration: transitions.duration.short,
        }),
      })}
    >
      {commentsData.loading ? <CircularProgress size={25} /> : <SendIcon />}
    </IconButton>
  ) : (
    <Tooltip arrow enterTouchDelay={0} title={t("comments.authHelper")}>
      <IconButton
        type={"submit"}
        color={"secondary"}
        onClick={onAuth}
        sx={({ transitions }) => ({
          "&:hover": { transform: "scale(1.15)" },
          transition: transitions.create(["color", "transform"], {
            duration: transitions.duration.short,
          }),
        })}
      >
        <SendIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Box>
      <FormProvider {...commentsData.form}>
        <TextFieldElement
          name={"comment"}
          multiline
          placeholder={t("comments.placeholder")}
          maxRows={5}
          rules={{
            maxLength: {
              value: 700,
              message: t("errors.maxLength", { value: 500, ns: "common" }),
            },
          }}
          onChange={commentsData.onChangeInput}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position={"end"}>{sendButton}</InputAdornment>
              ),
              startAdornment: !!commentsData.editCommentId ? (
                <InputAdornment position={"start"}>
                  <Button
                    variant={"text"}
                    sx={{ textTransform: "none" }}
                    color={"secondary"}
                    onClick={commentsData.onCancelEdit}
                  >
                    {t("buttons.cancel", { ns: "common" })}
                  </Button>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />
      </FormProvider>
      <Box display={commentsData.comments.length > 0 ? "block" : "none"}>
        <Typography
          mt={"1.5em"}
          mb={"1.2em"}
          fontSize={{ xs: "18px", md: "20px" }}
        >
          {t("comments.totalComments")} {commentsData.comments.length}
        </Typography>
        <AnimatePresence mode="popLayout">
          {commentsData.comments.map((c, i) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, x: -400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: 200,
                scale: 1.2,
              }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Comment
                isModerator={hasModerationAccess}
                userId={userId}
                onUpdate={commentsData.onClickUpdateComment}
                onDelete={commentsData.onDeleteComment}
                locale={dateFnsLocale}
                comment={c}
                index={i}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default Comments;
