import { useForm } from "react-hook-form-mui";
import { ICommentsFormContext } from "@/containers/place/content/comments/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { IComment } from "@/services/comments-service/comment.interface";
import commentsService from "@/services/comments-service/comments.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import useRoleAccess from "@/hooks/useRoleAccess";
import RolesEnum from "@/services/auth-service/enums/roles.enum";
import { selectIsAuth } from "@/store/user-slice/user.slice";
import { useTranslation } from "next-i18next";

const useComments = (placeId: number) => {
  const { t } = useTranslation(["place", "common"]);
  const [canSendComment, setCanSendComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const hasModerationAccess = useRoleAccess([
    RolesEnum.ADMIN,
    RolesEnum.MODERATOR,
  ]);

  const form = useForm<ICommentsFormContext>({
    defaultValues: {
      comment: "",
    },
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value &&
      e.target.value.trim().length > 0 &&
      e.target.value.length < 700
    ) {
      if (!canSendComment) setCanSendComment(true);
    } else {
      if (canSendComment) setCanSendComment(false);
    }
  };

  const onDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
    const request = hasModerationAccess
      ? commentsService.deleteCommentAdministration
      : commentsService.deleteComment;
    request(id)
      .then(() => {})
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("comments.feedback.deleteError")} ${t(
                "errors.description",
                { ns: "common" }
              )}`,
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  const onCancelEdit = () => {
    setEditCommentId(null);
    form.reset();
  };

  const onClickUpdateComment = (id: number) => {
    const commentText = comments.find((c) => c.id === id)?.text;
    if (commentText) {
      setEditCommentId(id);
      form.setValue("comment", commentText);
      form.setFocus("comment");
      setCanSendComment(true);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      setEditCommentId(null);
      form.reset();
    }
    commentsService
      .getPlaceComments(placeId)
      .then(({ data }) => {
        setComments(data);
      })
      .catch(() => {
        setComments([]);
      });
  }, [placeId, isAuth]);

  const onUpdateComment = () => {
    form.handleSubmit((data) => {
      if (!editCommentId) return;
      setLoading(true);
      const request = hasModerationAccess
        ? commentsService.updateCommentAdministration
        : commentsService.updateComment;
      request({ commentId: editCommentId, text: data.comment })
        .then(({ data }) => {
          setEditCommentId(null);
          setLoading(false);
          form.reset();
          setCanSendComment(false);
          setComments(
            comments.map((c) => {
              if (c.id === data.id) {
                return data;
              }
              return c;
            })
          );
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: t("feedback.error", { ns: "common" }),
                description: `${t("comments.feedback.updateError")} ${t(
                  "errors.description",
                  { ns: "common" }
                )}`,
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  };

  const onAddComment = () => {
    if (!canSendComment) return;
    if (!!editCommentId) return onUpdateComment();
    setLoading(true);
    form.handleSubmit((data) => {
      commentsService
        .addComment({ placeId, text: data.comment })
        .then(({ data }) => {
          setLoading(false);
          form.reset();
          setCanSendComment(false);
          setComments([data, ...comments]);
        })
        .catch(() => {
          setLoading(false);
          dispatch(
            showAlertThunk({
              alertProps: {
                title: t("feedback.error", { ns: "common" }),
                description: `${t("comments.feedback.createError")} ${t(
                  "errors.description",
                  { ns: "common" }
                )}`,
                variant: "standard",
                severity: "error",
              },
              snackbarProps: {},
            })
          );
        });
    })();
  };

  return {
    form,
    onAddComment,
    canSendComment,
    onChangeInput,
    loading,
    comments,
    onDeleteComment,
    onClickUpdateComment,
    editCommentId,
    onCancelEdit,
    hasModerationAccess,
  };
};

export default useComments;
