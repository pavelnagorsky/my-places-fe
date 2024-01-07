import { useForm } from "react-hook-form-mui";
import { ICommentsFormContext } from "@/containers/place/comments/interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { IComment } from "@/services/comments-service/comment.interface";
import commentsService from "@/services/comments-service/comments.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { selectIsAuth } from "@/store/user-slice/user.slice";

const useComments = (placeId: number) => {
  const [canSendComment, setCanSendComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const form = useForm<ICommentsFormContext>({
    defaultValues: {
      comment: "",
    },
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value &&
      e.target.value.trim().length > 0 &&
      form.formState.isValid
    ) {
      if (!canSendComment) setCanSendComment(true);
    } else {
      if (canSendComment) setCanSendComment(false);
    }
  };

  const onDeleteComment = (id: number) => {
    commentsService
      .deleteComment(id)
      .then(() => {
        setComments(comments.filter((c) => c.id !== id));
      })
      .catch(() => {
        dispatch(
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description:
                "Ошибка при удалении комментария. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
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
    if (!editCommentId) return;
    setLoading(true);
    form.handleSubmit((data) => {
      commentsService
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
            showAlert({
              alertProps: {
                title: "Ошибка!",
                description:
                  "Ошибка при обновлении комментария. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
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
            showAlert({
              alertProps: {
                title: "Ошибка!",
                description:
                  "Ошибка при создании комментария. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
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
  };
};

export default useComments;
