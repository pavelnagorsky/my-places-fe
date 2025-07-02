import { useForm } from "react-hook-form-mui";
import { ICommentsFormContext } from "@/containers/place/content/comments/logic/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { IComment } from "@/services/place-comments-service/interfaces/comment.interface";
import placeCommentsService from "@/services/place-comments-service/place-comments.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import useRoleAccess from "@/hooks/useRoleAccess";
import RolesEnum from "@/services/auth-service/enums/roles.enum";
import { selectIsAuth } from "@/store/user-slice/user.slice";
import { useTranslation } from "next-i18next";
import useAnalytics from "@/hooks/analytics/useAnalytics";
import { AnalyticsEventsEnum } from "@/hooks/analytics/analytic-events.enum";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import excursionCommentsService from "@/services/excursion-comments-service/excursion-comments.service";

const useComments = ({
  entityId,
  entityType,
}: {
  entityId: number;
  entityType: StatisticEntitiesEnum;
}) => {
  const { t } = useTranslation("common");
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
  const sendAnalytics = useAnalytics();
  const service =
    entityType === StatisticEntitiesEnum.Excursion
      ? excursionCommentsService
      : placeCommentsService;

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
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: `delete entity type ${entityId} comment`,
      entityId: `${entityId}`,
    });
    service
      .deleteComment(id)
      .then(() => {})
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error"),
              description: `${t("comments.feedback.deleteError")} ${t(
                "errors.description"
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
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: `edit entity type ${entityId} comment`,
      entityId: `${entityId}`,
    });
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
    service
      .getComments(entityId)
      .then(({ data }) => {
        setComments(data);
      })
      .catch(() => {
        setComments([]);
      });
  }, [entityId, entityType, isAuth]);

  const onUpdateComment = () => {
    form.handleSubmit((data) => {
      if (!editCommentId) return;
      sendAnalytics(AnalyticsEventsEnum.CustomClick, {
        title: `update entity type ${entityId} comment`,
        entityId: `${entityId}`,
      });
      setLoading(true);
      service
        .updateComment({ commentId: editCommentId, text: data.comment })
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
                title: t("feedback.error"),
                description: `${t("comments.feedback.updateError")} ${t(
                  "errors.description"
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
    sendAnalytics(AnalyticsEventsEnum.CustomClick, {
      title: `create entity type ${entityId} comment`,
      entityId: `${entityId}`,
    });
    setLoading(true);
    form.handleSubmit((data) => {
      service
        .addComment({
          placeId: entityId,
          excursionId: entityId,
          text: data.comment,
        })
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
                title: t("feedback.error"),
                description: `${t("comments.feedback.createError")} ${t(
                  "errors.description"
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
