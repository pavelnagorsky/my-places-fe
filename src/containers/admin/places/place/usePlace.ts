import { useEffect, useState } from "react";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { useTranslation } from "next-i18next";
import placesService from "@/services/places-service/places.service";
import { useRouter } from "next/router";

const usePlace = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const query = router.query as { id: string };
  const [place, setPlace] = useState<IMyPlace | null>(null);

  const fetchPlace = () => {
    placesService
      .getPlaceInfoForAdmin(query.id, i18n.language)
      .then(({ data }) => {
        setPlace(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPlace();
  }, [i18n.language, query.id]);

  return { place, id: +query.id, fetchPlace };
};

export default usePlace;
