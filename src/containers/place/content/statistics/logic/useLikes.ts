import { StatisticEntitiesEnum } from "@/services/reports-service/enums";
import { useEffect, useState } from "react";
import placeLikesService from "@/services/place-likes-service/place-likes.service";
import { selectIsAuth } from "@/store/user-slice/user.slice";
import { useAppSelector } from "@/store/hooks";
import excursionLikesService from "@/services/excursion-likes-service/excursion-likes.service";

const useLikes = ({
  entityType,
  entityId,
  initialLikesCount,
}: {
  entityId: number;
  entityType: StatisticEntitiesEnum;
  initialLikesCount?: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikesCount || 0);
  const isAuth = useAppSelector(selectIsAuth);
  const service =
    entityType === StatisticEntitiesEnum.Place
      ? placeLikesService
      : excursionLikesService;

  useEffect(() => {
    if (!isAuth) return;
    service
      .checkLikeExists(entityId)
      .then(({ data }) => {
        if (data.isLiked) {
          // to handle SSG issue when places is liked by user but there is 0 likes in the SSG cache
          if (likesCount === 0) {
            setLikesCount((count) => count + 1);
          }
          setIsLiked(true);
        }
      })
      .catch(() => {});
    if (!isAuth) {
      setIsLiked(false);
      return;
    }
  }, [entityId, isAuth]);

  const changeLike = () => {
    if (loading) return;
    setLoading(true);
    const wasLiked = isLiked;
    setIsLiked(!isLiked);
    if (wasLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    service
      .toggleLike(entityId)
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return { changeLike, isLiked, likesCount, changeLikeLoading: loading };
};

export default useLikes;
