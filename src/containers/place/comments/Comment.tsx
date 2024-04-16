import { IComment } from "@/services/comments-service/comment.interface";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";

interface ICommentProps {
  comment: IComment;
  index: number;
  locale: any;
  userId: number | null;
  isModerator: boolean;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

const Comment = ({
  comment,
  index,
  locale,
  onDelete,
  onUpdate,
  userId,
  isModerator,
}: ICommentProps) => {
  const { t } = useTranslation("common");
  const isMyComment = !!userId && userId === comment.authorId;
  const canManage = isMyComment || isModerator;
  const bgColor = index % 2 == 0 ? "#FFF6EE" : "#FFEEDE";
  return (
    <Paper
      elevation={1}
      sx={{
        overflow: "hidden",
        mb: "0.9em",
        borderRadius: "10px",
        p: "0.7em",
        backgroundColor: bgColor,
      }}
    >
      <Stack direction={"row"} gap={"1em"}>
        <Avatar>{comment.authorUsername[0]}</Avatar>
        <Box width={"100%"}>
          <Stack
            mb={"0.5em"}
            direction={"row"}
            alignItems={"center"}
            gap={"1em"}
            justifyContent={"space-between"}
          >
            <Typography
              variant={"body2"}
              fontWeight={500}
              fontSize={{ xs: "13px", md: "16px" }}
            >
              {comment.authorUsername}
            </Typography>
            <Typography
              variant={"body2"}
              fontWeight={500}
              textAlign={"end"}
              fontSize={{ xs: "13px", md: "14px" }}
            >
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale,
              })}
            </Typography>
          </Stack>
          <Typography
            color={"#727272"}
            fontSize={{ xs: "16px", md: "18px" }}
            sx={{ wordBreak: "break-word" }}
          >
            {comment.text}
          </Typography>
          {canManage && (
            <Stack
              direction={"row"}
              justifyContent={{ xs: "start", md: "end" }}
              mt={"0.5em"}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"0.5em"}
                sx={{
                  "& button, hr": { fontSize: "12px", textTransform: "none" },
                }}
              >
                {isMyComment && (
                  <Fragment>
                    <Button
                      size={"small"}
                      variant={"text"}
                      color={"secondary"}
                      onClick={() => onUpdate(comment.id)}
                    >
                      {t("buttons.edit")}
                    </Button>

                    <Divider
                      orientation={"vertical"}
                      variant={"middle"}
                      sx={{
                        color: "divider",
                      }}
                    />
                  </Fragment>
                )}
                <Button
                  size={"small"}
                  variant={"text"}
                  color={"error"}
                  onClick={() => onDelete(comment.id)}
                >
                  {t("buttons.delete")}
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default Comment;
